const T = -2; // -2 // real -11
const G = 6.674 * Math.pow(10, T) ; // gravitational constant // 0.05

let minimapUpscale = 3;
// laggyyy
const showTrail = false; // Toggle trail visibility // "all", "planets", "off"
const trailLength = 1000; // 2500

var displayTimer = 60*3; // weird
let upgrade = ""; // bruv


class Body
{
    constructor(x, y, radius, mass, color, initialVelocity)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
        this.color = color || "gray";
        this.velocity = initialVelocity || { x: 0, y: 0 };
        this.trail = [];
        this.interacted = false;
    }

    draw() 
    {
        canvas.foreground.beginPath();
        canvas.foreground.arc(MAP_LEFT+this.x+ship.xPos, MAP_TOP+this.y+ship.yPos, this.radius, 0, Math.PI * 2);
        canvas.foreground.fillStyle = this.color;
        canvas.foreground.fill();
        canvas.foreground.closePath();

        this.drawMiniMap();
    }

    drawMiniMap()
    {
        let scale = 1;
        if (this == sun) {scale = 2}
        else {scale = minimapUpscale}
        canvas.minimap.beginPath();
        canvas.minimap.arc(this.x/75, this.y/75, this.radius/75 * scale, 0, Math.PI * 2);
        canvas.minimap.fillStyle = this.color;
        canvas.minimap.fill();
        canvas.minimap.closePath();

        if (showTrail) 
        {
            this.trail.push({ x: this.x/75, y: this.y/75 });
            if (this.trail.length > trailLength) {
                this.trail.shift();
            }

            canvas.minimap.strokeStyle = this.color;
            canvas.minimap.lineWidth = 0.5;
            canvas.minimap.beginPath();
            canvas.minimap.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) 
            {
                canvas.minimap.lineTo(this.trail[i].x, this.trail[i].y);
            }
            canvas.minimap.stroke();
            canvas.minimap.closePath();
        }
    }

    update()
    {
        for (let i = 0; i < bodies.length; i++) {
            if (this === bodies[i]) continue;

            const dx = bodies[i].x - this.x;
            const dy = bodies[i].y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = G * ((this.mass * bodies[i].mass) / (distance * distance));

            const ax = force * dx / distance;
            const ay = force * dy / distance;

            this.velocity.x += ax / this.mass;
            this.velocity.y += ay / this.mass;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    checkCollision()
    {
        let distanceX = (this.x + MAP_LEFT+ship.xPos) - (SCREEN_MIDDLE.x + ship.width / 2);
        let distanceY = (this.y + MAP_TOP+ship.yPos) - (SCREEN_MIDDLE.y + ship.height / 2);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Edge collision
        if (distance < this.radius + Math.min(ship.width * collisionRange, ship.height * collisionRange) / 2)
        {
            if (this.color != "gray" && this.color != "yellow")
            {
                // In center
                if (distance < Math.min(ship.width, ship.height))
                {
                    // change scene to planet
                    // ...
                }

                let displayX = this.x + MAP_LEFT+ship.xPos;
                let displayY = this.y + MAP_TOP+ship.yPos;
                if (interact && !this.interacted)
                {
                    this.interacted = true;
                    let random = Math.floor(Math.random()*4);
                    switch (random)
                    {
                        case 0:
                            ship.boostCapacity += 100;
                            upgrade = "Booster tank capacity increased";
                            break;
                        case 1:
                            ship.energyCapacity += 500;
                            upgrade = "Battery capacity increased";
                            break;
                        case 2:
                            ship.maxShield += 50;
                            upgrade = "Shield durability increased";
                            break;
                        case 3:
                            ship.boostCapacity += 100;
                            upgrade = "Booster tank capacity increased";
                            break;
                        default:
                    }
                    displayTimer = 0;
                    
                    missions[2].completed++;
                    //sounds.pickup.play();
                }
                else if (interact || this.interacted)
                {
                    displayTextOnMap(displayX, displayY, `Planet visited`)
                }
                else if (!this.interacted)
                {
                    displayTextOnMap(displayX, displayY, "[E] Visit planet")
                }		
                if (displayTimer < 60*3)
                {
                    displayDefaultTextOnScreen("middle", -1, upgrade)
                    displayTimer++;
                }	
            }
            else
            {
                canvas.foreground.fillStyle = "red";
                canvas.foreground.beginPath();
                canvas.foreground.arc(SCREEN_MIDDLE.x+ship.width/2, SCREEN_MIDDLE.y+ship.width/2, ship.width/2 * collisionRange, 0, 2 * Math.PI);
                canvas.foreground.fill();

                if (ship.health > 0)
                {
                    if (ship.speed >= 0)
                    {
                        ship.health -= ship.speed + 1;
                    }
                    else
                    {
                        ship.health += ship.speed + 1;
                    }
                }
                else
                {
                    // GAME OVER
                    GAME_STATE = "lost";
                }
            }

            // sticky rocks
            /*
            ship.xPos += ship.speed * Math.sin(-ship.rotation * Math.PI / 180); // rotationspeed
            ship.yPos -= ship.speed * Math.cos(-ship.rotation * Math.PI / 180);
            */
        }

        // pull player towards TEMPORARY
        if (distance < this.radius + Math.min(ship.width * 50, ship.height * 50) / 2)
        {
            // Calculate vectors from ship to rock
            let rockToShipVector = {
                x: (MAP_LEFT + this.x + ship.xPos) - SCREEN_MIDDLE.x - ship.width / 2,
                y: (MAP_TOP + this.y + ship.yPos) - SCREEN_MIDDLE.y - ship.height / 2
            };

            // Calculate the angle between ship and rock
            let angleToRock = Math.atan2(rockToShipVector.y, rockToShipVector.x);

            // Move the ship towards the rock
            let gravity = 0;
            if (distance < this.radius)
            {
                gravity = this.radius / this.radius * 1.5;
            }
            else
            {
                gravity = this.radius / distance * 1.5;
            }
            ship.xPos -= gravity * Math.cos(angleToRock);
            ship.yPos -= gravity * Math.sin(angleToRock);
        }
    }
}
let bodies = new Array();
let bodyCount = 0;


// Central Star (Sun)
const sun = new Body(MAP_SIZE/2, MAP_SIZE/2, 500, 1000, 'yellow');
bodies.push(sun);

/*
let shipBody = new Body(ship.xPos+MAP_SIZE/2, ship.yPos+MAP_SIZE/2, 150, 1);
bodies.push(shipBody)
*/

function initPlanets()
{
    // Create bodies orbiting the sun
    const numBodies = 3;
    //const radius = 200; // distance from the sun
    for (let i = 0; i < numBodies; i++) 
    {
        let radius = 400 * (i+1) * (i+1) + sun.radius*4; // planets
        //let radius = 600 + Math.random()*160-80; // asteroids
        const angle = Math.random() * Math.PI * 2;
        const x = sun.x + radius * Math.cos(angle);
        const y = sun.y + radius * Math.sin(angle);
        const random = Math.random();
        const mass = random * 10 + 1;
        const rad = random * 125 + 75;
        //const mass = random;
        //const rad = random*2+1;
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        const distanceX = sun.x - x;
        const distanceY = sun.y - y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const speed = Math.sqrt(G * sun.mass / distance); // tangential velocity

        // Tangential velocity components
        const vx = speed * (distanceY / distance);
        const vy = speed * (-distanceX / distance);

        bodies.push(new Body(x, y, rad, mass, color, { x: vx, y: vy }));
    }
}
initPlanets();


function initAsteroids()
{
    // Create bodies orbiting the sun
    const numBodies = 50;
    //const radius = 200; // distance from the sun
    for (let i = 0; i < numBodies; i++) 
    {
        let radius = Math.random()*MAP_SIZE + sun.radius*2;
        //let radius = 600 + Math.random()*160-80; // asteroids
        const angle = (Math.PI * 2 / numBodies) * i;
        const x = sun.x + radius * Math.cos(angle);
        const y = sun.y + radius * Math.sin(angle);
        const random = Math.random();
        const mass = random*0.1;
        const rad = random*50+25;
        const color = "gray";
        const distanceX = sun.x - x;
        const distanceY = sun.y - y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const speed = Math.sqrt(G * sun.mass / distance); // tangential velocity

        // Tangential velocity components
        const vx = speed * (distanceY / distance);
        const vy = speed * (-distanceX / distance);

        bodies.push(new Body(x, y, rad, mass, color, { x: vx, y: vy }));
    }
}
initAsteroids();


function handleBodies()
{
    for (let i = 0; i < bodies.length; i++) 
    {
        bodies[i].update();
        bodies[i].draw();
        bodies[i].checkCollision();
    }
    /*
    ship.xPos += shipBody.velocity.x;
    ship.yPos += shipBody.velocity.y;
    */
}