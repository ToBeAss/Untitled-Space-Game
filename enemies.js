class Enemy {constructor(image, width, height, xPos, yPos, rotation, speed, maxSpeed, acceleration, deceleration, rotationSpeed, maxRotationSpeed, rotationAcceleration, health, maxHealth, vision, minDistance, blasterCooldown, accuracy, previousPositions, turnDuration)
{
    this.image = image;
    this.width = width;
    this.height = height;

    this.xPos = xPos;
    this.yPos = yPos;
    this.rotation = rotation;

    this.speed = speed;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.deceleration = deceleration;

    this.rotationSpeed = rotationSpeed;
    this.maxRotationSpeed = maxRotationSpeed;
    this.rotationAcceleration = rotationAcceleration;

    this.health = health;
    this.maxHealth = maxHealth;

    this.vision = vision;
    this.minDistance = minDistance;

    this.blasterCooldown = blasterCooldown;
    this.accuracy = accuracy;

    this.previousPositions = previousPositions;
    this.turnDuration = this.turnDuration;
}}

var enemyCanvases = new Array();
var enemyArray = new Array();
var enemyCount = 0;

while (enemyCount < 10)
{
    enemyCount++;

    let image = new Image();
    image.src = "images/enemy.png";

    let x = Math.random()*15000; //map size
    let y = Math.random()*15000;

    enemyArray.push(new Enemy(
        image, 60, 60, //shipwidth
        x, y, 0, 
        0*0.5, 9*0.5, 0.25*0.5, 0.1*0.5, // *GAME_SPEED/GAME_FPS
        0*0.5, 4*0.5, 0.5*0.5,
        300, 300, //300
        600, 200, //600, 200
        false, 10, //10
        [], 0,
    ));

    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = 1470; //screen_width
    canvas.height = 1470 / (16/9);

    let context = canvas.getContext("2d");
    enemyCanvases.push(context);
}


function handleEnemies()
{
    enemyCanvases.forEach(function(object, index)
    {
        // clear canvas
        enemyCanvases[index].clearRect(0, 0, 1470, 1470 / (16/9));
    });

    enemyArray.forEach(function(object, index)
    {
        // vision
        let distanceX = (object.xPos+MAP_LEFT+ship.xPos+object.width/2) - (SCREEN_MIDDLE.x+ship.width/2);
        let distanceY = (object.yPos+MAP_TOP+ship.yPos+object.height/2) - (SCREEN_MIDDLE.y+ship.height/2);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        

        if (distance < object.vision + Math.min(ship.width, ship.height) / 2)
        {
            if (distance < object.minDistance + Math.min(ship.width, ship.height) / 2 && ship.speed < ship.maxSpeed-0.2)
            {
                decelerateSpeed(object);
            }
            else 
            {
                accelerateSpeed(object);
            }

            // turning
            let angle = drawLinesAndCalculateAngle(object);

            if (angle > 2) // turn left // * (object.speed+1)
            {
                accelerateRotation(object, "left");
            }
            else if (angle < -2) // turn right // * (object.speed+1)
            {
                accelerateRotation(object, "right");
            }
            else // in line of sight
            {	
                decelerateRotation(object);
            }

            if (!(angle > object.accuracy || angle < -object.accuracy) && !object.blasterCooldown) // shooting range
            {
                // fire
                object.blasterCooldown = true;
                setTimeout(function(){object.blasterCooldown = false;}, 150)
                laserArray.push(new Laser(object.xPos+object.width/2, object.yPos+object.height/2, -object.previousPositions[object.previousPositions.length-1].rotation + (Math.random()*object.accuracy - (object.accuracy/2)), 15, 0))
                laserCount++;
            }
        }
        else
        {
            decelerateSpeed(object);
        }

        enemyCanvases[index].save();
			
        // rotation
        enemyCanvases[index].translate((MAP_LEFT+object.xPos+ship.xPos)+object.width/2, (MAP_TOP+object.yPos+ship.yPos)+object.height/2)
        enemyCanvases[index].rotate(object.rotation * Math.PI / 180);
        enemyCanvases[index].translate(-((MAP_LEFT+object.xPos+ship.xPos)+object.width/2), -((MAP_TOP+object.yPos+ship.yPos)+object.height/2))
        
        // draw
        enemyCanvases[index].drawImage(object.image, MAP_LEFT+object.xPos+ship.xPos, MAP_TOP+object.yPos+ship.yPos, object.width, object.height);
        
        enemyCanvases[index].restore();

        //movement
        object.xPos += object.speed * Math.sin(object.rotation * Math.PI / 180);
        object.yPos -= object.speed * Math.cos(object.rotation * Math.PI / 180);

        //minimao
        canvas.minimap.fillStyle = "red";
        canvas.minimap.fillRect((object.xPos)/75-(object.width/75*6)/2, (object.yPos)/75-(object.height/75*6)/2, object.width/75*6, object.height/75*6)

        //motion trail
        storeLastPosition(object.xPos, object.yPos, object.rotation, object.previousPositions);
        for (var i = 0; i < object.previousPositions.length-1; i++) 
        {
            var ratio = (i + 1) / object.previousPositions.length;

            canvas.foreground.beginPath();
            canvas.foreground.arc(MAP_LEFT+ship.xPos+object.previousPositions[i].x+object.width/2, MAP_TOP+ship.yPos+object.previousPositions[i].y+object.height/2, 7.5, 0, 2 * Math.PI, true);
            if (object.speed > 5.2) {canvas.foreground.fillStyle = "rgba(255, 255, 0, " + ratio / 2 + ")";}
            else {canvas.foreground.fillStyle = "rgba(255, 255, 255, " + ratio / 2 + ")";}
            canvas.foreground.fill();
        }

        //health bar
        if (calculatePercentage(object.health, object.maxHealth, 0) < 25) {color = "red";}
        else if (calculatePercentage(object.health, object.maxHealth, 0) < 50) {color = "orange";}
        else {color = TEXT.color;}
        displayText("Health: " + calculatePercentage(object.health, object.maxHealth, 0) + "%", MAP_LEFT+object.xPos+ship.xPos, MAP_TOP+object.yPos+ship.yPos, TEXT.size, color)
        /*
        let width = calculatePercentage(object.health, object.maxHealth, 0);
        canvas.userInterface.fillStyle = "black";
        canvas.userInterface.fillRect(MAP_LEFT+object.xPos+ship.xPos - 100/2 + object.width/2, MAP_TOP+object.yPos+ship.yPos, 100, 5)
        canvas.userInterface.strokeStyle = "white";
        canvas.userInterface.lineWidth = 1;
        canvas.userInterface.strokeRect(MAP_LEFT+object.xPos+ship.xPos - 100/2 + object.width/2, MAP_TOP+object.yPos+ship.yPos, 100, 5)
        canvas.userInterface.fillStyle = "red";
        canvas.userInterface.fillRect(MAP_LEFT+object.xPos+ship.xPos - 100/2 + object.width/2, MAP_TOP+object.yPos+ship.yPos, width, 5)
        */
    });
}


function accelerateSpeed (object)
{
    if (object.speed < object.maxSpeed) {object.speed += object.acceleration;}
    else {object.speed = object.maxSpeed;}
}
function decelerateSpeed (object)
{
    if (object.speed > object.maxSpeed+0.1) {object.speed -= object.acceleration;}
    else if (object.speed > 0.1) {object.speed -= object.speed*object.deceleration;} // Deceleration value
    else {object.speed = 0;}
} 

function accelerateRotation (object, direction)
{
    if (direction == "left")
    {
        if (object.rotationSpeed > -object.maxRotationSpeed) {object.rotationSpeed -= object.rotationAcceleration;}
        else {object.rotationSpeed = -object.maxRotationSpeed;}
    }
    else if (direction == "right")
    {
        if (object.rotationSpeed < object.maxRotationSpeed) {object.rotationSpeed += object.rotationAcceleration;}
        else {object.rotationSpeed = object.maxRotationSpeed;}
    }
    object.rotation += object.rotationSpeed;
}
function decelerateRotation (object)
{
    if (object.rotationSpeed > 0.1) {object.rotationSpeed -= object.rotationAcceleration;}
    else if (object.rotationSpeed < -0.1) {object.rotationSpeed += object.rotationAcceleration;}
    else {object.rotationSpeed = 0;}
    object.rotation += object.rotationSpeed;
}