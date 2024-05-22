export class TrailComponent
{
    constructor(length = 10, width = 6, interval = 2)
    {
        this.length = length;
        this.width = width;
        this.positions = [];
        this.interval = interval;
        this.frameCounter = 0;
    }

    addPosition(position) {
        this.positions.push({ x: position.x, y: position.y });
        if (this.positions.length > this.length) {
            this.removePosition();
        }
    }
    
    removePosition()
    {
        this.positions.shift();
    }

    update(position) 
    {
        this.frameCounter++;
        if (this.frameCounter >= this.interval) {
            if (position == null) this.removePosition();
            else this.addPosition(position);
            this.frameCounter = 0;
        }
    }
}