var hoveringOverButton = false;
var menuPage = "main";
function updateMenu()
{
    canvas.userInterface.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    canvas.userInterface.beginPath();
    canvas.userInterface.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (canvas.userInterface.isPointInPath(MOUSE.x, MOUSE.y)) {hoveringOverButton = false;}

    canvas.userInterface.fillStyle = "lightblue";
    canvas.userInterface.strokeStyle = "steelblue";
    canvas.userInterface.lineWidth = 4;
    let menuWidth = SCREEN_WIDTH*0.2;
    let menuHeight = SCREEN_HEIGHT*0.5;
    canvas.userInterface.beginPath();
    canvas.userInterface.roundRect(SCREEN_WIDTH/2-menuWidth/2, SCREEN_HEIGHT/2-menuHeight/2, menuWidth, menuHeight, 25);
    canvas.userInterface.fill();
    canvas.userInterface.stroke();

    if (menuPage == "main")
    {
        let textArray = ["Main Menu", "Continue", "Settings", "Reload", "Quit"];
        displayTextOnScreen("middle", -5, 24, "black", textArray[0]);
        createButtons(4, menuWidth, menuHeight, 1, textArray);
    }
    else if (menuPage == "settings")
    {
        let textArray = ["Settings", "Video", "Audio", "Controls", "Back"];
        displayTextOnScreen("middle", -5, 24, "black", textArray[0]);
        createButtons(4, menuWidth, menuHeight, 1, textArray);
    }
    else if (menuPage == "video_settings")
    {
        let textArray = ["Video Settings", "", "", "", "Back"];
        displayTextOnScreen("middle", -5, 24, "black", textArray[0]);
        createButtons(1, menuWidth, menuHeight, 4, textArray);
        videoSettings(menuWidth, menuHeight);
    }

    // custom cursor
    let cursorSize = 10;
    if (hoveringOverButton) {cursorSize = 15;}
    canvas.userInterface.fillStyle = "red";
    canvas.userInterface.fillRect(MOUSE.x-cursorSize/2, MOUSE.y-cursorSize/2, cursorSize, cursorSize); // change to pixelart
}

function createButtons(amount, divWidth, divHeight, startingIndex, textArray)
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
            canvas.userInterface.fillStyle = "cornflowerblue";
            if (MOUSE.click)
            {
                buttonLogic(textArray[i]);
            }
        }

        canvas.userInterface.fill();
        canvas.userInterface.stroke();

        let textSize = 20;
        displayText(textArray[i], buttonX+buttonWidth/2-getTextLength(textArray[i], textSize)/2, buttonY+buttonHeight/2+textSize/2-2, textSize, "black");
    }
}

function buttonLogic(action)
{
    switch (action)
    {
        case "Continue":
            escaped = !escaped;
            if (escaped && GAME_STATE == "playing") {GAME_STATE = "paused";}
            else if (!escaped && GAME_STATE == "playing" || GAME_STATE == "paused") {GAME_STATE = "playing"; updateScreen();}
            break;
        case "Settings":
            menuPage = "settings";
            break;
        case "Reload":
            location.reload();
            break;
        case "Quit":
            let confirmed = confirm("Are you sure you want to exit the game?");
            if (confirmed) {window.close();}
            break;
        case "Back":
            menuPage = "main";
            break;
        case "Video":
            menuPage = "video_settings";
            break;
        default:
    }
}


function videoSettings(divWidth, divHeight)
{
    let margin = 20;
    let textSize = 18;
    let buttonHeight = divHeight*0.15;
    displayText("Resolution: ", SCREEN_WIDTH/2-divWidth/2+margin, SCREEN_HEIGHT/2-divHeight/2+margin+textSize+buttonHeight, textSize, "white");
    canvas.userInterface.fillRect(SCREEN_WIDTH/2, SCREEN_HEIGHT/2-divHeight/2+margin+buttonHeight, divWidth/2-margin, buttonHeight/2);
    displayText("Fit to screen", SCREEN_WIDTH/2, SCREEN_HEIGHT/2-divHeight/2+margin+textSize+buttonHeight, textSize, "black");

    canvas.userInterface.beginPath();
    canvas.userInterface.rect(SCREEN_WIDTH/2, SCREEN_HEIGHT/2-divHeight/2+margin+buttonHeight, divWidth/2-margin, buttonHeight/2)
    if(canvas.userInterface.isPointInPath(MOUSE.x, MOUSE.y))
    {
        // change cursor
        hoveringOverButton = true;
        canvas.userInterface.fillStyle = "cornflowerblue";
        if (MOUSE.click)
        {
            // fit to screen
        }
    }
}