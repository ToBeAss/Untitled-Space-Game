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
        blasters = true;
    }
}