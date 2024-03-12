class Text 
{
    constructor(text, position, size, color, font) 
    {
        this.text = text;
        this.position = position;
        this.size = size || 20 * SCALE;
        this.color = color || "white";
        this.font = font || "monaco";
        this.x = 0;
        this.y = 0;
        this.lineSpace = 3 * SCALE;
    }

    length()
    {
        canvas.userInterface.font = this.size + "px " + this.font;
        return canvas.userInterface.measureText(this.text).width;
    }

    getCoordinates()
    {
        let margin = 20 * SCALE;
        //let lineMargin = (lineNumber-1) * (size + TEXT.lineSpacing);
        if (typeof this.position == "string")
        {
            if (this.position.includes("top"))
            {
                this.y = POSITIONS.screen.top + margin + this.size;
            }
            else if (this.position.includes("bottom"))
            {
                this.y = POSITIONS.screen.bottom - margin;
            }
            if (this.position.includes("right"))
            {
                this.x = POSITIONS.screen.right - margin - this.length();
            }
            else if (this.position.includes("left"))
            {
                this.x = POSITIONS.screen.left + margin;
            }
            if (this.position == "middle")
            {
                this.x = POSITIONS.screen.middleX - this.length()/2;
                this.y = POSITIONS.screen.middleY;
            }
        }
        else
        {
            this.x = this.position.x;
            this.y = this.position.y;
        }
    }

    display()
    {
        this.getCoordinates();
        canvas.userInterface.font = this.size + "px " + TEXT.font;
        canvas.userInterface.fillStyle = this.color;
        canvas.userInterface.fillText(this.text, this.x, this.y)
    }
}