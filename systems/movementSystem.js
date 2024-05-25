import { AccelerationComponent } from "../components/accelerationComponent.js";
import { AngularAccelerationComponent } from "../components/angularAccelerationComponent.js";
import { AngularVelocityComponent } from "../components/angularVelocityComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { TrailComponent } from "../components/trailComponent.js";
import { VelocityComponent } from "../components/velocityComponent.js";

export class MovementSystem
{
    constructor()
    {
    }

    moveEntity(entity)
    {
        const position = entity.getComponent(PositionComponent);
        const velocity = entity.getComponent(VelocityComponent);
        const rotation = entity.getComponent(RotationComponent);
        const trail = entity.getComponent(TrailComponent);

        if (position && velocity && rotation) 
        {
            let angle = rotation.radians;
            position.x += velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle);
            position.y += velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle);

            if (trail) 
            {
                if (velocity.y < 0) trail.update(position);
                else trail.update();
            }
        }
    }

    rotateEntity(entity)
    {
        const rotation = entity.getComponent(RotationComponent);
        const angularVelocity = entity.getComponent(AngularVelocityComponent);

        if (rotation && angularVelocity)
        {
            rotation.degrees += angularVelocity.degrees;
            rotation.radians += angularVelocity.radians;
        }
    }

    processIntents(entity, intents)
    {
        const velocity = entity.getComponent(VelocityComponent);
        const angularVelocity = entity.getComponent(AngularVelocityComponent);
        const acceleration = entity.getComponent(AccelerationComponent);
        const angularAcceleration = entity.getComponent(AngularAccelerationComponent);
        const trail = entity.getComponent(TrailComponent);

        if (trail) {trail.isBoosting = false;} // maybe change implementation

        if (velocity && angularVelocity && acceleration && angularAcceleration) {
            // Process vertical velocity
            if (intents.moveUp && intents.moveDown) {
                velocity.y = this.decelerate(velocity.y, acceleration);
            } else if (intents.moveUp) {
                if (intents.boost) {
                    velocity.y = this.accelerate(velocity.y, acceleration, -1, 2);
                    if (trail) {trail.isBoosting = true;}
                } else if (velocity.y < -acceleration.maxSpeed) {
                    velocity.y = this.decelerate(velocity.y, acceleration);
                } else {
                    velocity.y = this.accelerate(velocity.y, acceleration, -1, 1);
                }
            } else if (intents.moveDown) {
                velocity.y = this.accelerate(velocity.y, acceleration, 1, 0.5);
            } else {
                velocity.y = this.decelerate(velocity.y, acceleration);
            }

            // Process angular velocity
            if (intents.rotateLeft && intents.rotateRight) {
                angularVelocity.degrees = this.decelerate(angularVelocity.degrees, angularAcceleration);
            } else if (intents.rotateLeft) {
                angularVelocity.degrees = this.accelerate(angularVelocity.degrees, angularAcceleration, -1, 1);
            } else if (intents.rotateRight) {
                angularVelocity.degrees = this.accelerate(angularVelocity.degrees, angularAcceleration, 1, 1);
            } else {
                angularVelocity.degrees = this.decelerate(angularVelocity.degrees, angularAcceleration);
            }
            angularVelocity.radians = angularVelocity.degrees * Math.PI / 180;
        }
    }

    // Pass direction as -1 (forwards) or 1 (backwards)
    accelerate(value, accelerationComponent, direction, magnitude = 1)
    {
        value += accelerationComponent.acceleration * direction;
        if (value * direction >= accelerationComponent.maxSpeed * magnitude) {
            value = accelerationComponent.maxSpeed * direction * magnitude;
        }
        return value;
    }

    decelerate(value, accelerationComponent)
    {
        if (value > 0) {
            value -= accelerationComponent.deceleration;
            if (value < 0) value = 0;
        } else if (value < 0) {
            value += accelerationComponent.deceleration;
            if (value > 0) value = 0;
        }
        return value;
    }
}