import { CanvasComponent } from "../components/canvasComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { SizeComponent } from "../components/sizeComponent.js";

export class CameraSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity
        this.scale = 1;
    }

    static(x = 0, y = 0)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);
        if (canvas && size) 
        {
            canvas.ctx.translate(size.width/2 + x, size.height/2 + y);
            canvas.ctx.scale(this.scale, this.scale);
        }
    }

    follow(entity, followRotation = false)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);
        const position = entity.getComponent(PositionComponent);

        if (canvas && size && position) 
        {
            if (followRotation) {this.rotateAround(entity);}
            canvas.ctx.translate(size.width/2 - position.x * this.scale, size.height/2 - position.y * this.scale);
            canvas.ctx.scale(this.scale, this.scale);
        }
    }

    rotateAround(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);
        const rotation = entity.getComponent(RotationComponent);

        if (canvas && size && rotation)
        {
            canvas.ctx.translate(size.width/2, size.height/2);
            canvas.ctx.rotate(-rotation.radians);
            canvas.ctx.translate(-size.width/2, -size.height/2);
        }
    }

    zoom(scale = 1)
    {
        this.scale = scale;
    }
}