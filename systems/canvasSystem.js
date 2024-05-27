import { CanvasComponent } from '../components/canvasComponent.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { MeshComponent } from "../components/meshComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from '../components/rotationComponent.js';
import { TrailComponent } from '../components/trailComponent.js';
import { ColorComponent } from '../components/colorComponent.js';
import { CollisionComponent } from '../components/collisionComponent.js';
import { HealthComponent } from '../components/healthComponent.js';

export class CanvasSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity;
    }

    setSize(width, height)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);

        if (canvas && size) 
        {
            size.width = width;
            size.height = height;

            canvas.element.width = size.width;
            canvas.element.height = size.height;
        }
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
                canvas.ctx.beginPath();
                canvas.ctx.arc(pos.x, pos.y, trail.width, 0, Math.PI * 2);
                canvas.ctx.globalAlpha = alpha;
                canvas.ctx.fillStyle = "white";
                if (trail.isBoosting) {canvas.ctx.fillStyle = "yellow";}
                canvas.ctx.fill();
            }
            
        }
    }

    drawHitBox(entity, showHitBox = false)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const position = entity.getComponent(PositionComponent);
        const collision = entity.getComponent(CollisionComponent);
        const health = entity.getComponent(HealthComponent);

        if (showHitBox || (health && health.isBeingDamaged))
        {
            if (canvas && position && collision)
            {
                let color = "white";
                if (health.isBeingDamaged) color = "red";
                this.drawCircle(position, collision.radius, color, 0.5)
            }
        }
    }

    renderEntity(entity, showHitBox = false)
    {
        this.drawTrail(entity);
        this.drawHitBox(entity, showHitBox);

        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const mesh = entity.getComponent(MeshComponent);
        const position = entity.getComponent(PositionComponent);
        const size = entity.getComponent(SizeComponent);
        const rotation = entity.getComponent(RotationComponent);
        
        if (canvas && mesh && position && size && rotation)
        {
            if (mesh.image.complete)
            { 
                let z = position.z;
                let w = size.width * z; 
                let h = size.height * z;
                let x = position.x * z - w/2;
                let y = position.y * z - h/2;
                
                canvas.ctx.save();

                this.rotateEntity(entity);
                canvas.ctx.globalAlpha = mesh.alpha * z;
                canvas.ctx.drawImage(mesh.image, x, y, w, h);

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
            this.drawLine(position, tail, size.width, color.color, 1 * position.z);
        }
    }

    drawLine(positionA = {x: 0, y: 0}, positionB = {x: 0, y: 0}, lineWidth = 0, color = "white", alpha = 1)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
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

    drawCircle(position = {x: 0, y: 0}, radius = 0, color = "white", alpha = 1)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);

        if (canvas)
        {
            canvas.ctx.beginPath();
            canvas.ctx.fillStyle = color;
            canvas.ctx.globalAlpha = alpha;
            canvas.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
            canvas.ctx.fill();
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

    fillCanvas(color)
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);

        if (canvas && size)
        {
            canvas.ctx.fillStyle = color;
            canvas.ctx.fillRect(0, 0, size.width, size.height);
        }
    }
}