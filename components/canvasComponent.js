export class CanvasComponent
{
    constructor()
    {
        this.element = document.createElement("canvas");
        this.ctx = this.element.getContext("2d");
        document.body.appendChild(this.element);
    }
}