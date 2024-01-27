function displayText(text, x, y, size, color)
{
    canvas.userInterface.font = size + "px " + TEXT.font;
    canvas.userInterface.fillStyle = color;
    canvas.userInterface.fillText(text, x, y)
}

function calculateCoordinates(location, lineNumber, text, size)
{
    let margin = 20 * SCALE;
    let lineMargin = (lineNumber-1) * (size + TEXT.lineSpacing);
    if (location == "top-left")
    {
        x = POSITIONS.screen.left + margin;
        y = POSITIONS.screen.top + margin + size + lineMargin;
    }
    else if (location == "top-right")
    {
        x = POSITIONS.screen.right - margin - getTextLength(text, size);
        y = POSITIONS.screen.top + margin + size + lineMargin;
    }
    else if (location == "bottom-right")
    {
        x = POSITIONS.screen.right - margin - getTextLength(text, size);
        y = POSITIONS.screen.bottom - margin - lineMargin;
    }
    else if (location == "bottom-left")
    {
        x = POSITIONS.screen.left + margin;
        y = POSITIONS.screen.bottom - margin - lineMargin;
    }
    else if (location == "middle")
    {
        x = POSITIONS.screen.middleX - getTextLength(text, size)/2;
        y = POSITIONS.screen.middleY + lineMargin;
    }
    return {x:x,y:y};
}


function displayDefaultTextOnScreen(location, lineNumber, text)
{
    let coord = calculateCoordinates(location, lineNumber, text, TEXT.size);
    displayText(text, coord.x, coord.y, TEXT.size, TEXT.color)
}
function displayTextOnScreen(location, lineNumber, size, color, text)
{
    let coord = calculateCoordinates(location, lineNumber, text, size);
    displayText(text, coord.x, coord.y, size, color)
}

function displayTextOnMap(x, y, text)
{
    displayText(text, x, y, TEXT.size, TEXT.color)
}


function drawInterface() 
{
    // BOTTOM-LEFT
    displayDefaultTextOnScreen("bottom-left", 1, "Rotation: " + Math.round(ship.rotation)%360);
    displayDefaultTextOnScreen("bottom-left", 2, "Speed: " + ship.speed.toFixed(1));
    
    // TOP-RIGHT
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 3*SCALE;
    canvas.userInterface.strokeRect(POSITIONS.screen.right-MAP_MINIMAP_SIZE-20*SCALE, POSITIONS.screen.top+20*SCALE, MAP_MINIMAP_SIZE, MAP_MINIMAP_SIZE);
        displayText("Minimap here", POSITIONS.screen.right-getTextLength("Minimap here", 14*SCALE)-65*SCALE, POSITIONS.screen.top+125*SCALE, 14*SCALE);
    displayTextOnScreen("top-right", 13, 14*SCALE, TEXT.color, "x: " + ship.xPos.toFixed(0) + ", y: " + ship.yPos.toFixed(0));
    
    // TOP-LEFT
    displayTextOnScreen("top-left", 1, 24*SCALE, TEXT.color, "Tasks:");
    displayDefaultTextOnScreen("top-left", 2.5, "* Collect fuel " + mission.collectFuel[0] + "/" + mission.collectFuel[1]);
    displayDefaultTextOnScreen("top-left", 4, "* Collect upgrades " + mission.collectUpgrades[0] + "/" + mission.collectUpgrades[1]);
    displayDefaultTextOnScreen("top-left", 5.5, "* Elliminate enemies " + mission.killEnemies[0] + "/" + mission.killEnemies[1]);
    
    // BOTTOM-RIGHT
    if (calculatePercentage(ship.health, ship.maxHealth, 0) < 25) {color = "red";}
    else if (calculatePercentage(ship.health, ship.maxHealth, 0) < 50) {color = "orange";}
    else {color = TEXT.color;}
    displayTextOnScreen("bottom-right", 1, TEXT.size, color, "Hull integrity: " + calculatePercentage(ship.health, ship.maxHealth, 0) + "%");
    displayDefaultTextOnScreen("bottom-right", 2, "Boost tank: " + calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%");
    
    /*let width = calculatePercentage(ship.health, ship.maxHealth, 0);

    canvas.userInterface.fillStyle = "transparent";
    canvas.userInterface.fillRect(POSITIONS.screen.left+20, POSITIONS.screen.bottom-60, 100, 40)
    canvas.userInterface.strokeRect(POSITIONS.screen.left+20, POSITIONS.screen.bottom-60, 100, 40)

    canvas.userInterface.fillStyle = color;
    canvas.userInterface.fillRect(POSITIONS.screen.left+20, POSITIONS.screen.bottom-60, width, 40)

    displayText(calculatePercentage(ship.health, ship.maxHealth, 0) + "%", POSITIONS.screen.left+20+50-getTextLength(calculatePercentage(ship.health, ship.maxHealth, 0) + "%", 18)/2, POSITIONS.screen.bottom-60+20+18/2, 18, "white")


    let radius = calculatePercentage(ship.boostTank, ship.boostCapacity, 0);
    let rad = 20

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120+50, POSITIONS.screen.bottom-20, 50-rad, Math.PI, Math.PI*2, false) // Math.PI
    canvas.userInterface.strokeStyle = "transparent";
    canvas.userInterface.lineWidth = rad*2;
    canvas.userInterface.stroke();
    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120+50, POSITIONS.screen.bottom-20, 50, Math.PI, Math.PI*2, false) // Math.PI
    canvas.userInterface.strokeStyle = "white";
    canvas.userInterface.lineWidth = 2;
    canvas.userInterface.stroke();

    canvas.userInterface.beginPath();
    canvas.userInterface.arc(POSITIONS.screen.right-120+50, POSITIONS.screen.bottom-20, 50-rad/2, Math.PI, Math.PI + radius/100*Math.PI, false) // Math.PI
    canvas.userInterface.strokeStyle = "yellow";
    canvas.userInterface.lineWidth = rad;
    canvas.userInterface.stroke();

    displayText(calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%", POSITIONS.screen.right-120+50-getTextLength(calculatePercentage(ship.boostTank, ship.boostCapacity, 0) + "%", 18)/2, POSITIONS.screen.bottom-20, 18, "white")
    //displayText(ship.speed.toFixed(1), POSITIONS.screen.right-120+50-getTextLength(ship.speed.toFixed(1), 18)/2, POSITIONS.screen.bottom-20, 18, "white")*/
}