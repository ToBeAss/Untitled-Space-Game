var hoveringOverButton = false;
function updateMenu()
{
    canvas.userInterface.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    canvas.userInterface.beginPath();
    canvas.userInterface.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (canvas.userInterface.isPointInPath(MOUSE.x, MOUSE.y)) {hoveringOverButton = false;}

    canvas.userInterface.fillStyle = "white";
    canvas.userInterface.strokeStyle = "steelblue";
    canvas.userInterface.lineWidth = 4;
    let menuWidth = SCREEN_WIDTH*0.2;
    let menuHeight = SCREEN_HEIGHT*0.5;
    canvas.userInterface.beginPath();
    canvas.userInterface.roundRect(SCREEN_WIDTH/2-menuWidth/2, SCREEN_HEIGHT/2-menuHeight/2, menuWidth, menuHeight, 25);
    canvas.userInterface.fill();
    canvas.userInterface.stroke();

    displayTextOnScreen("middle", -5, 24, "black", "Menu");

    createButtons(4, menuWidth, menuHeight, 1);

    // custom cursor
    let cursorSize = 10;
    if (hoveringOverButton) {cursorSize = 15;}
    canvas.userInterface.fillStyle = "red";
    canvas.userInterface.fillRect(MOUSE.x-cursorSize/2, MOUSE.y-cursorSize/2, cursorSize, cursorSize); // change to pixelart
}

function createButtons(amount, divWidth, divHeight, startingIndex)
{
    let buttonWidth = divWidth*0.9;
    let buttonHeight = divHeight*0.15;
    let topMargin = divHeight*0.025;

    for (let i = startingIndex; i < amount+startingIndex; i++)
    {
        canvas.userInterface.fillStyle = "steelblue";
        canvas.userInterface.strokeStyle = "white";
        canvas.userInterface.lineWidth = 2;

        let buttonIndex = i;
        let buttonMargin = divHeight*0.025*(buttonIndex+1);
        let buttonX = SCREEN_WIDTH/2-buttonWidth/2;
        let buttonY = SCREEN_HEIGHT/2-divHeight/2+topMargin+buttonMargin+(buttonHeight*buttonIndex);
        canvas.userInterface.beginPath();
        canvas.userInterface.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 15);

        if(canvas.userInterface.isPointInPath(MOUSE.x, MOUSE.y))
        {
            // change cursor
            hoveringOverButton = true;
            if (MOUSE.click)
            {
                buttonLogic(buttonIndex);
            }
        }

        canvas.userInterface.fill();
        canvas.userInterface.stroke();

        let textSize = 20;
        let buttonText = ["Menu", "Continue", "Settings", "Reload", "Exit"];
        displayText(buttonText[i], buttonX+buttonWidth/2-getTextLength(buttonText[i], textSize)/2, buttonY+buttonHeight/2+textSize/2-2, textSize, "black");
    }
}

function buttonLogic(index)
{
    switch (index)
    {
        case 1:
            escaped = !escaped;
            if (escaped && GAME_STATE == "playing") {GAME_STATE = "paused";}
            else if (!escaped && GAME_STATE == "playing" || GAME_STATE == "paused") {GAME_STATE = "playing"; updateScreen();}
            break;
        case 2:
            console.log("Settings");
            break;
        case 3:
            location.reload();
            break;
        case 4:
            let confirmed = confirm("Are you sure you want to exit the game?");
            if (confirmed) {window.close();}
            break;
        default:
    }
}