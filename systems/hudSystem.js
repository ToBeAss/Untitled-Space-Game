import { CanvasComponent } from "../components/canvasComponent.js";
import { HealthComponent } from "../components/healthComponent.js";
import { PositionComponent } from "../components/positionComponent.js";

export class HUDSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity;
    }

    displayHealth(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const position = entity.getComponent(PositionComponent);
        const health = entity.getComponent(HealthComponent);

        if (canvas && position && health)
        {
            if (health.health > 0) {
                let text = (health.health/health.maxHealth * 100).toFixed(0) + "%";
                let offset = {x: 0, y: -25}
                this.drawText(text, position, offset, "white", 14);
            }
        }
    }

    drawText(text = "Hello World!", position = {x: 0, y: 0}, offset = {x: 0, y: 0}, color = "white", size = 12)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        if (canvas)
        {
            canvas.ctx.fillStyle = color;
            canvas.ctx.globalAlpha = 1;
            canvas.ctx.font = size + "px Monaco";
            let width = canvas.ctx.measureText(text).width;
            // y + size/3 should be size/2, but because of the font, size/3 looks better
            canvas.ctx.fillText(text, position.x - width/2 + offset.x, position.y + size/3 + offset.y);
        }
    }
}