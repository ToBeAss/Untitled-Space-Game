import { Entity } from './Entity.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { CanvasComponent } from '../components/canvasComponent.js';

export class CanvasEntity extends Entity
{
    constructor(width, height)
    {
        super("CanvasEntity");
        this.addComponent(new CanvasComponent());
        this.addComponent(new SizeComponent(width, height));
        this.setSize(width, height);
    }

    setSize(width, height)
    {
        const canvas = this.getComponent(CanvasComponent);
        const size = this.getComponent(SizeComponent);

        if (canvas && size)
        {
            size.width = width;
            size.height = height;

            canvas.element.width = size.width;
            canvas.element.height = size.height;
        }
    }

    strokeLine(positionA = {x: 0, y: 0}, positionB = {x: 0, y: 0}, lineWidth = 0, color = "white", alpha = 1)
    {
        const canvas = this.getComponent(CanvasComponent);
        if (canvas)
        {
            canvas.ctx.lineWidth = lineWidth;
            canvas.ctx.strokeStyle = color;
            canvas.ctx.globalAlpha = alpha;
            canvas.ctx.beginPath()
            canvas.ctx.moveTo(positionA.x, positionA.y);
            canvas.ctx.lineTo(positionB.x, positionB.y);
            canvas.ctx.stroke();
        }
    }

    fillCircle(position = {x: 0, y: 0}, radius = 0, color = "white", alpha = 1, angle = 360)
    {
        const canvas = this.getComponent(CanvasComponent);

        if (canvas)
        {
            let start = 0 * Math.PI / 180
            let radians = angle * Math.PI / 180;
            canvas.ctx.beginPath();
            canvas.ctx.fillStyle = color;
            canvas.ctx.globalAlpha = alpha;
            canvas.ctx.arc(position.x, position.y, radius, start, start + radians);
            canvas.ctx.fill();
        }
    }

    fillRect(position = {x: 0, y: 0}, size = {width: 0, height: 0}, color = "white", alpha = 1)
    {
        const canvas = this.getComponent(CanvasComponent);

        if (canvas)
        {
            canvas.ctx.beginPath();
            canvas.ctx.fillStyle = color;
            canvas.ctx.globalAlpha = alpha;
            canvas.ctx.rect(position.x, position.y, size.width, size.height);
            canvas.ctx.fill();
        }
    }

    fillCanvas(color)
    {
        const canvas = this.getComponent(CanvasComponent);
        const size = this.getComponent(SizeComponent);

        if (canvas && size)
        {
            canvas.ctx.fillStyle = color;
            canvas.ctx.fillRect(0, 0, size.width, size.height);
        }
    }

    clearCanvas()
    {
        const canvas = this.getComponent(CanvasComponent);
        const size = this.getComponent(SizeComponent);

        if (canvas && size)
        {
            canvas.ctx.clearRect(0, 0, size.width, size.height);
        }
    }
}