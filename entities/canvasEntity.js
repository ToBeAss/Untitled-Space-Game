import { Entity } from './Entity.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { CanvasComponent } from '../components/canvasComponent.js';

export class CanvasEntity extends Entity
{
    constructor(width, height)
    {
        super();
        this.addComponent(new CanvasComponent());
        this.addComponent(new SizeComponent());
    }
}