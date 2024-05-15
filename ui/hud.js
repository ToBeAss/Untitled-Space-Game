function drawHUD() 
{
    // BOTTOM-LEFT
    //displayDefaultTextOnScreen("bottom-left", 1, "Rotation: " + Math.round(ship.rotation)%360);
    //displayDefaultTextOnScreen("bottom-left", 2, "Speed: " + ship.speed.toFixed(1));
    
    // TOP-RIGHT
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 3*SCALE;
    canvas.userInterface.strokeRect(POSITIONS.screen.right-MAP_MINIMAP_SIZE-20*SCALE, POSITIONS.screen.top+20*SCALE, MAP_MINIMAP_SIZE, MAP_MINIMAP_SIZE);
        displayText("Minimap here", POSITIONS.screen.right-getTextLength("Minimap here", 14*SCALE)-65*SCALE, POSITIONS.screen.top+125*SCALE, 14*SCALE);
    displayTextOnScreen("top-right", 13, 14*SCALE, TEXT.color, "x: " + ship.xPos.toFixed(0) + ", y: " + ship.yPos.toFixed(0));
    
    // TOP-LEFT
    displayTextOnScreen("top-left", 1, 24*SCALE, TEXT.color, "Tasks:");
    for (let i = 0; i < missions.length; i++)
    {
        displayDefaultTextOnScreen("top-left", 2.5+1.5*i, `* ${missions[i].name} ${missions[i].completed}/${missions[i].goal}`);
    }
    //isplayDefaultTextOnScreen("top-left", 2.5, "* Collect fuel " + missions[0].completed + "/" + missions[0].goal);
    //displayDefaultTextOnScreen("top-left", 4, "* Collect upgrades " + mission.collectUpgrades[0] + "/" + missions.collectUpgrades[1]);
    //displayDefaultTextOnScreen("top-left", 4, "* Elliminate enemies " + missions[1].completed + "/" + missions[1].goal);
    
    // BOTTOM-RIGHT
    //displayTextOnScreen("bottom-right", 1, TEXT.size, color, "Hull integrity: " + calculatePercentage(ship.health, ship.maxHealth, 0) + "%");
    //displayDefaultTextOnScreen("bottom-right", 2, "Boost tank: " + calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%");

    let healthPercentage = calculatePercentage(ship.health, ship.maxHealth, 0);
    let shieldPercentage = calculatePercentage(ship.shield, ship.maxShield, 0);
    let r = 65;

    displayText("Health", POSITIONS.screen.left+20+r-getTextLength("Health", 16)/2, POSITIONS.screen.bottom-20-r-5, 16, "white")
    displayText(healthPercentage + "%", POSITIONS.screen.left+20+r-getTextLength(healthPercentage + "%", 20)/2, POSITIONS.screen.bottom-20-r+20, 20, "white")

    // health
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.left+20+r, POSITIONS.screen.bottom-20-r, r-(r*3/12), Math.PI*1.5, Math.PI*1.5 + healthPercentage/100*Math.PI*2, false) // + & false or - & true
    canvas.userInterface.strokeStyle = "red";
    canvas.userInterface.lineWidth = r/Math.PI/2;
    canvas.userInterface.stroke();
    
    // shield
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.left+20+r, POSITIONS.screen.bottom-20-r, r-(r*1/12), Math.PI*1.5, Math.PI*1.5 + shieldPercentage/100*Math.PI*2, false) // Math.PI, Math.PI + radius/100*Math.PI
    canvas.userInterface.strokeStyle = "blue";
    canvas.userInterface.lineWidth = r/Math.PI/2;
    canvas.userInterface.stroke();

    // inner edge
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.left+20+r, POSITIONS.screen.bottom-20-r, r-r/3, 0, Math.PI*2, true)
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 2;
    canvas.userInterface.stroke();

    // outer edge
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.left+20+r, POSITIONS.screen.bottom-20-r, r, 0, Math.PI*2, true)
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 2;
    canvas.userInterface.stroke();


    // battery
    let batteryPercentage = calculatePercentage(ship.energyStore, ship.energyCapacity, 0);

    if (batteryPercentage < 25) {color = "red";}
    else if (batteryPercentage < 50) {color = "orange";}
    else {color = "lime";}

    canvas.userInterface.fillStyle = "transparent";
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-25-40, 100, 40)

    canvas.userInterface.fillStyle = color;
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-25-40, batteryPercentage, 40)

    canvas.userInterface.strokeRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-25-40, 100, 40)
    canvas.userInterface.fillStyle = "white";
    canvas.userInterface.fillRect(POSITIONS.screen.right-20, POSITIONS.screen.bottom-20-25-20-10, 5, 20)

    displayText(batteryPercentage + "%", POSITIONS.screen.right-20-100/2-getTextLength(batteryPercentage + "%", 18)/2, POSITIONS.screen.bottom-20-25-40+20+18/2, 18, "white")


    // boost
    let radius = calculatePercentage(ship.boostTank, ship.boostCapacity, 0);
    let rad = 20

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5-rad/2, Math.PI, Math.PI*2, false) // Math.PI
    canvas.userInterface.strokeStyle = "transparent";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5, Math.PI, Math.PI*2, false) // Math.PI
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 3;
    canvas.userInterface.stroke();

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5-rad/2, Math.PI, Math.PI + radius/100*Math.PI, false) // Math.PI
    canvas.userInterface.strokeStyle = "#FFEF00";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5-rad/2, Math.PI+0.73, Math.PI + 25/100*Math.PI, false) // Math.PI
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5-rad/2, Math.PI+1.51, Math.PI + 50/100*Math.PI, false) // Math.PI
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120-12.5+50, POSITIONS.screen.bottom-20-25-30-20, 50-12.5-rad/2, Math.PI+2.29, Math.PI + 75/100*Math.PI, false) // Math.PI
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();

    displayText(calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%", POSITIONS.screen.right-120-12.5+50-getTextLength(calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%", 14)/2, POSITIONS.screen.bottom-20-25-30-20, 14, "white")


    // speedometer
    let speed = calculatePercentage(ship.speed, ship.maxSpeed, 0);
    if (speed > 100) {speed = 100;}
    let boost = calculatePercentage(ship.speed, ship.maxSpeed*2, 0);
    boost = (boost-50)*2;

    canvas.userInterface.lineWidth = 2;
    canvas.userInterface.fillStyle = "transparent";
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-15, POSITIONS.screen.bottom-20-25-50, 15, -40)

    canvas.userInterface.fillStyle = "cyan";
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-15, POSITIONS.screen.bottom-20-25-50, 15, -speed/100*40)
    canvas.userInterface.fillStyle = "#FFEF00";
    canvas.userInterface.fillRect(POSITIONS.screen.right-20, POSITIONS.screen.bottom-20-25-50, -15, -Math.max(0, boost)/100*40)

    canvas.userInterface.strokeRect(POSITIONS.screen.right-20-15, POSITIONS.screen.bottom-20-25-50, 15, -40)

    canvas.userInterface.fillStyle = "white";
    canvas.userInterface.globalAlpha = 1;
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-15-5, POSITIONS.screen.bottom-20-25-50-speed/100*(40-10)-10, 15+10, 10)
    canvas.userInterface.globalAlpha = 1;
    displayText((ship.speed*1).toFixed(1), POSITIONS.screen.right-20-7.5-getTextLength((ship.speed*1).toFixed(1), 10)/2, POSITIONS.screen.bottom-20-25-50-speed/100*(40-10)-10+10-1, 10, "black")


    // battery use
    if (ship.speed > ship.maxSpeed/2 && ship.energyStore > 0)
    {canvas.userInterface.fillStyle = "lime";}
    else if (ship.speed > 0 && ship.energyStore > 0)
    {
        canvas.userInterface.fillStyle = "lime";
        canvas.userInterface.fillRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-20, 15, 10)
        canvas.userInterface.fillStyle = "transparent";
    }
    else
    {canvas.userInterface.fillStyle = "transparent";}
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-20, 30, 10)
    canvas.userInterface.strokeRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-20, 30, 10)
    displayText("E", POSITIONS.screen.right-20-100+15-getTextLength("E", 10)/2, POSITIONS.screen.bottom-20, 10, "white")

    if (lasersAreFiring)
    {canvas.userInterface.fillStyle = "lime";}
    else
    {canvas.userInterface.fillStyle = "transparent";}
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-65, POSITIONS.screen.bottom-20-20, 30, 10)
    canvas.userInterface.strokeRect(POSITIONS.screen.right-20-65, POSITIONS.screen.bottom-20-20, 30, 10)
    displayText("W", POSITIONS.screen.right-20-65+15-getTextLength("W", 10)/2, POSITIONS.screen.bottom-20, 10, "white")

    if (shieldIsRestoring)
    {canvas.userInterface.fillStyle = "lime";}
    else
    {canvas.userInterface.fillStyle = "transparent";}
    canvas.userInterface.fillRect(POSITIONS.screen.right-20-30, POSITIONS.screen.bottom-20-20, 30, 10)
    canvas.userInterface.strokeRect(POSITIONS.screen.right-20-30, POSITIONS.screen.bottom-20-20, 30, 10)
    displayText("S", POSITIONS.screen.right-20-30+15-getTextLength("S", 10)/2, POSITIONS.screen.bottom-20, 10, "white")

    //canvas.userInterface.strokeRect(POSITIONS.screen.right-20-100, POSITIONS.screen.bottom-20-20, 100, 20)


    /*
    let arr = new Array(); 
    arr.push(new Text("borat", "middle", 10, "red"), new Text("blyat", {x: 200, y: 200}, 0, "lime"));
    for (let i = 0; i < arr.length; i++)
    {
        arr[i].display();
    }
    */
}