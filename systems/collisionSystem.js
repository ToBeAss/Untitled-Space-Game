import { CollisionComponent } from "../components/collisionComponent.js";
import { PositionComponent } from "../components/positionComponent.js";

export class CollisionSystem
{
    constructor()
    {}
    
    checkCircularCollision(entityA, entityB)
    {
        const positionA = entityA.getComponent(PositionComponent);
        const collisionA = entityA.getComponent(CollisionComponent);
        const positionB = entityB.getComponent(PositionComponent);
        const collisionB = entityB.getComponent(CollisionComponent);

        if (positionA && collisionA && positionB && collisionB)
        {
            let disX = positionB.x - positionA.x;
            let disY = positionB.y - positionA.y;
            let distance = Math.sqrt(disX * disX + disY * disY);

            if (distance < collisionA.radius + collisionB.radius)
            {
                // Calculate the normal vector
                let normal = { x: disX / distance, y: disY / distance };
                return { collision: true, normal: normal };
            }
        }
        return { collision: false, normal: null };
    }
}