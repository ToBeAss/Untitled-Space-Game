function detectCircularCollision(object, scale)
{
    var distanceX = (object.xPos + MAP_LEFT+ship.xPos) - (SCREEN_MIDDLE.x + ship.width / 2);
    var distanceY = (object.yPos + MAP_TOP+ship.yPos) - (SCREEN_MIDDLE.y + ship.height / 2);
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < object.rad + Math.min(ship.width * scale, ship.height * scale) / 2)
    {
        // Collision
        return true;
    }
    return false;
}

function detectRectangularCollision(object, scale)
{
    var overlapX = Math.abs((object.xPos + MAP_LEFT+ship.xPos + 100/2) - (SCREEN_MIDDLE.x + ship.width / 2)) < (100 / 2 + ship.width / 2 * scale);
    var overlapY = Math.abs((object.yPos + MAP_TOP+ship.yPos + 100/2) - (SCREEN_MIDDLE.y + ship.height / 2)) < (100 / 2 + ship.height / 2 * scale);

    if (overlapX && overlapY)
    {
        // Collision
        return true;
    }
    return false;
}