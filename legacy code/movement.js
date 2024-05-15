var shieldIsRestoring = false; // weird

function detectMovement()
{
// TURNING
    if (left && !right) 
    {
        if (ship.rotationSpeed < ship.maxRotationSpeed) {ship.rotationSpeed += ship.rotationAcceleration}
        else {ship.rotationSpeed = ship.maxRotationSpeed;}
        ship.rotation += ship.rotationSpeed; 
    }
    if (right && !left) 
    {
        if (ship.rotationSpeed > -ship.maxRotationSpeed) {ship.rotationSpeed -= ship.rotationAcceleration}
        else {ship.rotationSpeed = -ship.maxRotationSpeed;}
        ship.rotation += ship.rotationSpeed; 
    }
    if (left && right)
    {
        if (ship.rotationSpeed > 0.1) {ship.rotationSpeed -= ship.rotationAcceleration}
        else if (ship.rotationSpeed < -0.1) {ship.rotationSpeed += ship.rotationAcceleration}
        else {ship.rotationSpeed = 0;}
        ship.rotation += ship.rotationSpeed;
    }
    if (!left && !right)
    {
        if (ship.rotationSpeed > 0.1) {ship.rotationSpeed -= ship.rotationAcceleration}
        else if (ship.rotationSpeed < -0.1) {ship.rotationSpeed += ship.rotationAcceleration}
        else {ship.rotationSpeed = 0;}
        ship.rotation += ship.rotationSpeed; 
    }

// FORWARDS
    if (forward && ship.energyStore > 0)
    {
        if (boosters && ship.boostTank > 0) 
        {
            ship.boostTank -= ship.boostConsumption;
            if (ship.speed < ship.maxSpeed*2) {ship.speed += ship.acceleration;}
            else {ship.speed = ship.maxSpeed*2;}
        }
        else
        {
            if (ship.speed > ship.maxSpeed+0.1) {ship.speed -= ship.acceleration;}

            else if (ship.speed < ship.maxSpeed) {ship.speed += ship.acceleration;}
            else {ship.speed = ship.maxSpeed;}
        }
        ship.xPos += ship.speed * Math.sin(ship.rotation * Math.PI / 180);
        ship.yPos += ship.speed * Math.cos(ship.rotation * Math.PI / 180);

        //sounds.ship.play();
    }
    if (!forward || ship.energyStore <= 0)
    {
        if (ship.speed > ship.maxSpeed+0.1) {ship.speed -= ship.acceleration;}
        else if (ship.speed > 0.1) {ship.speed -= ship.speed*ship.deceleration;} // Deceleration value
        
        //else if (ship.speed < -ship.maxSpeed/2-0.1) {ship.speed += ship.acceleration;}
        //else if (ship.speed < -0.1) {ship.speed -= ship.speed*ship.deceleration;}

        else {ship.speed = 0;}
        ship.xPos += ship.speed * Math.sin(ship.rotation * Math.PI / 180);
        ship.yPos += ship.speed * Math.cos(ship.rotation * Math.PI / 180);

        /*
        if (!forward && ship.energyStore < ship.energyCapacity)
        {
            ship.energyStore += ship.energyRestoration;
        }
        */
        //sounds.ship.pause();
        //sounds.ship.currentTime = 0;
    }


    if (ship.speed > ship.maxSpeed/2 && ship.energyStore > 0)
    {
        ship.energyStore -= ship.energyConsumption;
    }
    else if (ship.speed > 0 && ship.energyStore > 0)
    {
        ship.energyStore -= ship.energyConsumption/2;
    }

    
    if (ship.energyStore < ship.energyCapacity)
    {
        ship.energyStore += ship.energyRestoration;
    }

    // where? check line 1 as well
    // shield refill
    if (ship.shield < ship.maxShield && ship.energyStore > 2)
    {
        ship.shield += ship.energyConsumption;
        ship.energyStore -= ship.energyConsumption;
        shieldIsRestoring = true;
    }
    else
    {
        shieldIsRestoring = false;
    }

// BACKWARDS
    /*if (backward) // SHOULD TURN THE OTHER WAY
    {
        //ship.speed = -5;
        if (ship.speed > -ship.maxSpeed/2) {ship.speed -= ship.acceleration;}
        else {ship.speed = -ship.maxSpeed/2;}
        backgroundX += ship.speed * Math.sin(ship.rotation * Math.PI / 180);
        backgroundY += ship.speed * Math.cos(ship.rotation * Math.PI / 180);
    }
    if (forward && backward)
    {
        if (ship.speed > 0.1) {ship.speed -= ship.acceleration}
        else if (ship.speed < -0.1) {ship.speed += ship.acceleration}
        else {ship.speed = 0;}
        backgroundX += ship.speed * Math.sin(ship.rotation * Math.PI / 180);
        backgroundY += ship.speed * Math.cos(ship.rotation * Math.PI / 180);
    }*/
}

function storeLastPosition(xPos, yPos, rotation, array) 
{
    // push an item
    array.push({
        x: xPos,
        y: yPos,
        rotation: rotation
    });
    
    //get rid of first item
    if (array.length > motionTrailLength) {
        array.shift();
    }
}