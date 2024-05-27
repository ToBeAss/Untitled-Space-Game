import { AngularVelocityComponent } from "../components/angularVelocityComponent.js";
import { CollisionComponent } from "../components/collisionComponent.js";
import { MeshComponent } from "../components/meshComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { SizeComponent } from "../components/sizeComponent.js";
import { VelocityComponent } from "../components/velocityComponent.js";
import { Entity } from "./Entity.js";

export class AsteroidEntity extends Entity
{
    constructor(src, pos, size)
    {
        super("AsteroidEntity");
        let imageSource = "../images/" + src;
        this.addComponent(new MeshComponent(imageSource));
        this.addComponent(new SizeComponent(size, size));
        this.addComponent(new PositionComponent(pos.x, pos.y));
        this.addComponent(new RotationComponent(0));
        this.addComponent(new VelocityComponent(0, 0));
        this.addComponent(new AngularVelocityComponent(0.25));
        this.addComponent(new CollisionComponent(50));
    }
}