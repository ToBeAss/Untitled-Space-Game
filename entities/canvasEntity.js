import { Entity } from './Entity.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { CanvasComponent } from '../components/canvasComponent.js';

export class CanvasEntity extends Entity
{
    constructor(width, height)
    {
        super();
        this.addComponent(new CanvasComponent());
        this.addComponent(new SizeComponent(width, height));
        this.updateSize();
    }

    updateSize()
    {
        const canvas = this.getComponent(CanvasComponent);
        const size = this.getComponent(SizeComponent);

        if (canvas && size)
        {
            canvas.element.width = size.width;
            canvas.element.height = size.height;
        }
    }
}