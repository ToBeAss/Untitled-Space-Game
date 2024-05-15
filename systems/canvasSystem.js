import { CanvasComponent } from '../components/canvasComponent.js';
import { SizeComponent } from '../components/sizeComponent.js';

export class CanvasSystem
{
    constructor(entity)
    {
        this.entity = entity;
    }

    setSize(width, height)
    {
        const canvas = this.entity.getComponent(CanvasComponent);
        const size = this.entity.getComponent(SizeComponent);

        if (canvas && size) 
        {
            size.width = width;
            size.height = height;

            canvas.element.width = size.width;
            canvas.element.height = size.height;
        }
    }
}