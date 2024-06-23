export class VisionComponent
{
    constructor(radius, viewAngle = 360)
    {
        this.radius = radius;
        this.viewAngle = viewAngle;
        this.isSeeing = false;
    }
}