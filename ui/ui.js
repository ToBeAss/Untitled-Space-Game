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