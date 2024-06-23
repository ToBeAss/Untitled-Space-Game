import { CanvasComponent } from '../components/canvasComponent.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { MeshComponent } from "../components/meshComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from '../components/rotationComponent.js';
import { TrailComponent } from '../components/trailComponent.js';
import { ColorComponent } from '../components/colorComponent.js';
import { CollisionComponent } from '../components/collisionComponent.js';
import { HealthComponent } from '../components/healthComponent.js';
import { VisionComponent } from '../components/visionComponent.js';

export class RenderingSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity;
    }

    rotateEntity(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const rotation = entity.getComponent(RotationComponent);
        const position = entity.getComponent(PositionComponent);

        if (canvas && rotation && position)
        {
            canvas.ctx.translate(position.x, position.y);
            canvas.ctx.rotate(rotation.radians);
            canvas.ctx.translate(-position.x, -position.y);
        }
    }

    drawTrail(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const trail = entity.getComponent(TrailComponent);

        if (canvas && trail)
        {
            for (let i = 0; i < trail.positions.length - 1; i++) 
            {
                const pos = trail.positions[i];
                const alpha = i/trail.positions.length;
                let color = "white";
                if (trail.isBoosting) color = "yellow";
                this.canvasEntity.fillCircle(pos, trail.width, color, alpha);
            }
            
        }
    }

    drawHitBox(entity, color = "white")
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const position = entity.getComponent(PositionComponent);
        const collision = entity.getComponent(CollisionComponent);

        if (canvas && position && collision) {   
            this.canvasEntity.fillCircle(position, collision.radius, color, 0.5);
        }
    }

    drawVision(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const position = entity.getComponent(PositionComponent);
        const vision = entity.getComponent(VisionComponent);
        if (canvas && position && vision) {
            let color = "white"
            if (vision.isSeeing) color = "red";
            this.canvasEntity.fillCircle(position, vision.radius, color, 0.5);
        }
    }

    renderEntity(entity)
    {
        this.drawTrail(entity);
        
        const health = entity.getComponent(HealthComponent);
        if (health && health && health.isBeingDamaged && health.health > 0) {
            this.drawHitBox(entity, "red");
        }

        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const mesh = entity.getComponent(MeshComponent);
        const position = entity.getComponent(PositionComponent);
        const size = entity.getComponent(SizeComponent);
        const rotation = entity.getComponent(RotationComponent);
        
        if (canvas && mesh && position && size && rotation)
        {
            if (mesh.element.complete)
            { 
                let z = position.z;
                let w = size.width * z; 
                let h = size.height * z;
                let x = position.x * z - w/2;
                let y = position.y * z - h/2;
                
                canvas.ctx.save();

                this.rotateEntity(entity);
                canvas.ctx.globalAlpha = mesh.alpha * z;
                canvas.ctx.drawImage(mesh.element, x, y, w, h);

                canvas.ctx.restore();
            }
            else {console.log(`Image not loaded yet: ${mesh.src}`);}
        }
    }

    drawLaser(entity)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const position = entity.getComponent(PositionComponent);
        const size = entity.getComponent(SizeComponent);
        const rotation = entity.getComponent(RotationComponent);
        const color = entity.getComponent(ColorComponent);

        if (canvas && position && size && rotation && color)
        {
            let angle = rotation.radians;
            let tail = {};
            tail.x = position.x - size.height * Math.sin(angle);
            tail.y = position.y + size.height * Math.cos(angle);
            this.canvasEntity.strokeLine(position, tail, size.width, color.color, 1 * position.z);
            // Draw point for debugging purposes
            //this.canvasEntity.fillCircle(position, size.width, color.color, 1 * position.z);
        }
    }

    resetCanvas()
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);

        if (canvas && size)
        {
            canvas.ctx.restore();
            canvas.ctx.clearRect(0, 0, size.width, size.height);
            canvas.ctx.globalAlpha = 1;
            canvas.ctx.save();
        }
    }
}