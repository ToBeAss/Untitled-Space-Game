function calculatePercentage (dividend, divisor, numberOfDecimals)
{
    return((dividend/divisor)*100).toFixed(numberOfDecimals);
}

function getTextLength (text, size)
{
    canvas.userInterface.font = size + "px " + TEXT.font;
    return canvas.userInterface.measureText(text).width;
}


// Function to calculate the angle between two vectors
function calculateAngle(vector1, vector2) {
    let angle = Math.atan2(vector1.x * vector2.y - vector1.y * vector2.x, vector1.x * vector2.x + vector1.y * vector2.y);
    return angle * (180 / Math.PI);
}

// Function to draw lines and calculate angle
function drawLinesAndCalculateAngle(object) {
    // Calculate vectors for the lines
    let enemyToPlayerVector = {
        x: SCREEN_MIDDLE.x + ship.width / 2 - (MAP_LEFT + object.xPos + ship.xPos + object.width / 2),
        y: SCREEN_MIDDLE.y + ship.height / 2 - (MAP_TOP + object.yPos + ship.yPos + object.height / 2)
    };

    let enemyForwardVector = {
        x: Math.sin(object.rotation * (Math.PI / 180)),
        y: -Math.cos(object.rotation * (Math.PI / 180)) // Negative because canvas coordinates are flipped
    };

    // Draw lines
    /*canvas.enemies.lineWidth = 2;
    canvas.enemies.strokeStyle = "blue";
    canvas.enemies.beginPath();
    canvas.enemies.moveTo(MAP_LEFT + object.xPos + ship.xPos + object.width / 2, MAP_TOP + object.yPos + ship.yPos + object.height / 2);
    canvas.enemies.lineTo(MAP_LEFT + object.xPos + ship.xPos + object.width / 2 + objectForwardVector.x * 50, MAP_TOP + object.yPos + ship.yPos + object.height / 2 + objectForwardVector.y * 50);
    canvas.enemies.stroke();

    canvas.enemies.strokeStyle = "red";
    canvas.enemies.beginPath();
    canvas.enemies.moveTo(MAP_LEFT + object.xPos + ship.xPos + object.width / 2, MAP_TOP + object.yPos + ship.yPos + object.height / 2);
    canvas.enemies.lineTo(SCREEN_MIDDLE.x + ship.width / 2, SCREEN_MIDDLE.y + ship.height / 2);
    canvas.enemies.stroke();*/

    // Calculate and log the angle
    let angle = calculateAngle(enemyToPlayerVector, enemyForwardVector);
    return angle;
}


