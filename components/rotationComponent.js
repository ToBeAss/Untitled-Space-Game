export class RotationComponent
{
    constructor(degrees)
    {
        this.degrees = degrees;
        this.radians = degrees * Math.PI / 180;
    }
}