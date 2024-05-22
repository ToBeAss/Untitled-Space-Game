import { Entity } from "./Entity.js";
import { PositionComponent } from "../components/positionComponent.js";
import { VelocityComponent } from "../components/velocityComponent.js";
import { MeshComponent } from "../components/meshComponent.js";
import { SizeComponent } from "../components/sizeComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { AngularVelocityComponent } from "../components/angularVelocityComponent.js";
import { AccelerationComponent } from "../components/accelerationComponent.js";
import { AngularAccelerationComponent } from "../components/angularAccelerationComponent.js";
import { TrailComponent } from "../components/trailComponent.js";

export class PlayerEntity extends Entity
{
    constructor()
    {
        super();
        this.addComponent(new MeshComponent("../images/ship.png"));
        this.addComponent(new SizeComponent(60, 60));
        this.addComponent(new PositionComponent(0, 0));
        this.addComponent(new RotationComponent(0));
        this.addComponent(new VelocityComponent(0, 0));
        this.addComponent(new AngularVelocityComponent(0));
        this.addComponent(new AccelerationComponent(0.1, 0.05, 3));
        this.addComponent(new AngularAccelerationComponent(0.1, 0.1, 3));
        this.addComponent(new TrailComponent());
    }
}