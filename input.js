onkeydown = function (event)
{
    if (event.keyCode == 87) // W
    {
        forward = true;
    }
    if (event.keyCode == 83) // S
    {
        backward = true;
    }
    if (event.keyCode == 65) // A
    {
        left = true;
    }
    if (event.keyCode == 68) // D
    {
        right = true;
    }

    if (event.keyCode == 16) // Shift
    {
        boosters = true;
    }
    if (event.keyCode == 32) // Space
    {
        blasters = true;
    }

    if (event.keyCode == 69) // E
    {
        interact = true;
    }
}
onkeyup = function (event)
{
    if (event.keyCode == 87) // W
    {
        forward = false;
    }
    if (event.keyCode == 83) // S
    {
        backward = false;
    }
    if (event.keyCode == 65) // A
    {
        left = false;
    }
    if (event.keyCode == 68) // D
    {
        right = false;
    }

    if (event.keyCode == 16) // Shift
    {
        boosters = false;
    }
    if (event.keyCode == 32) // Space
    {
        blasters = false;
    }

    if (event.keyCode == 69) // E
    {
        interact = false;
    }
}

var escaped = false;
onkeypress = function (event)
{
    if (event.keyCode == 27) // Escape
    {
        event.preventDefault();
        escaped = !escaped;
        if (escaped && GAME_STATE == "playing") {GAME_STATE = "paused";}
        else if (!escaped && GAME_STATE == "playing" || GAME_STATE == "paused") {GAME_STATE = "playing"; updateScreen();}
    }
}

const MOUSE =
{
    x: 0,
    y: 0,
    click: false,
    down: false
}
onclick = function()
{
    MOUSE.click = true;
    setTimeout(function(){MOUSE.click=false;}, GAME_UPDATE_SPEED);
}
onmousemove = function(event)
{
    event.preventDefault();
    MOUSE.x = parseInt(event.clientX);
    MOUSE.y = parseInt(event.clientY);
}