import { CanvasComponent } from "../components/canvasComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { SizeComponent } from "../components/sizeComponent.js";

export class CameraSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity
    }

    follow(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);
        const position = entity.getComponent(PositionComponent);

        if (canvas && size && position) 
        {
            canvas.ctx.translate(size.width/2 - position.x, size.height/2 - position.y);
        }
    }

    static(x, y)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        if (canvas) canvas.ctx.translate(x, y);
    }
}