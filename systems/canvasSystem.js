import { CanvasComponent } from '../components/canvasComponent.js';
import { SizeComponent } from '../components/sizeComponent.js';
import { MeshComponent } from "../components/meshComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from '../components/rotationComponent.js';
import { TrailComponent } from '../components/trailComponent.js';

export class CanvasSystem
{
    constructor(canvasEntity)
    {
        this.canvasEntity = canvasEntity;
        this.updateSize();
    }

    updateSize()
    {
        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const size = this.canvasEntity.getComponent(SizeComponent);

        if (canvas && size) 
        {
            canvas.element.width = size.width;
            canvas.element.height = size.height;
        }
    }

    setSize(width, height)
    {
        const size = this.canvasEntity.getComponent(SizeComponent);

        if (size) 
        {
            size.width = width;
            size.height = height;
            this.updateSize();
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
            for (let i = 0; i < trail.positions.length - 1; i++) {
                const pos = trail.positions[i];
                const alpha = i/trail.positions.length;
                canvas.ctx.beginPath();
                canvas.ctx.arc(pos.x, pos.y, trail.width, 0, Math.PI * 2);
                canvas.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                canvas.ctx.fill();
            }
            
        }
    }

    renderEntity(entity)
    {
        this.drawTrail(entity); // Draw the trail first

        const canvas = this.canvasEntity.getComponent(CanvasComponent);
        const mesh = entity.getComponent(MeshComponent);
        const position = entity.getComponent(PositionComponent);
        const size = entity.getComponent(SizeComponent);
        const rotation = entity.getComponent(RotationComponent);
        
        if (canvas && mesh && position && size)
        {
            if (mesh.image.complete) // Check if the image is loaded
            { 
                let z = position.z;
                let w = size.width * z; 
                let h = size.height * z;
                let x = position.x * z - w/2;
                let y = position.y * z - h/2;
                
                canvas.ctx.save();

                if (rotation) this.rotateEntity(entity);
                canvas.ctx.globalAlpha = mesh.alpha * z; // unsure how this turns out
                canvas.ctx.drawImage(mesh.image, x, y, w, h);

                canvas.ctx.restore();

                // test
                canvas.ctx.fillStyle = "red";
                canvas.ctx.fillRect(-50-5, -50-5, 10, 10);
            }
            else {console.log(`Image not loaded yet: ${mesh.src}`);}
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
            canvas.ctx.save();
        }
    }
}