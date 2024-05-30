import { CollisionComponent } from "../components/collisionComponent.js";
import { ColorComponent } from "../components/colorComponent.js";
import { LifeSpanComponent } from "../components/lifeSpanComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { SizeComponent } from "../components/sizeComponent.js";
import { VelocityComponent } from "../components/velocityComponent.js";
import { Entity } from "./Entity.js";

export class LaserEntity extends Entity
{
    constructor(pos, rotation, color)
    {
        super("LaserEntity");
        this.addComponent(new PositionComponent(pos.x, pos.y));
        this.addComponent(new RotationComponent(rotation));
        this.addComponent(new ColorComponent(color));
        this.addComponent(new SizeComponent(3, 20));
        this.addComponent(new VelocityComponent(0, -15));
        this.addComponent(new CollisionComponent(1));
        this.addComponent(new LifeSpanComponent(500));
    }
}