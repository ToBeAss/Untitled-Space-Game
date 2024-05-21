import { AngularVelocityComponent } from "../components/angularVelocityComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
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

        if (position && velocity && rotation) 
        {
            let angle = rotation.radians;
            position.x += velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle);
            position.y += velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle);
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
        //const acceleration = entity.getComponent(); // IMPLEMENT

        if (velocity && angularVelocity) 
        {
            if (intents.moveUp && intents.moveDown) {
                velocity.y = 0;
            } else if (intents.moveUp) {
                velocity.y = -3; // Move up
            } else if (intents.moveDown) {
                velocity.y = 3; // Move down
            } else {
                velocity.y = 0; // Stop vertical movement
            }

            if (intents.rotateLeft && intents.rotateRight) {
                angularVelocity.degrees = 0;
            } else if (intents.rotateLeft) {
                angularVelocity.degrees = -2.5; // Move left
            } else if (intents.rotateRight) {
                angularVelocity.degrees = 2.5; // Move right
            } else {
                angularVelocity.degrees = 0; // Stop horizontal movement
            }
            angularVelocity.radians = angularVelocity.degrees * Math.PI / 180;

            // ACCELERATION
            // might need change

            /* if (intents.moveUp) {
                velocity.y += acceleration.acceleration;
                if (velocity.y > acceleration.maxSpeed) {
                    velocity.y = acceleration.maxSpeed;
                }
            } else if (intents.moveDown) {
                velocity.y -= acceleration.deceleration;
                if (velocity.y < -acceleration.maxSpeed) {
                    velocity.y = -acceleration.maxSpeed;
                }
            } else {
                // Apply deceleration
                // Similar logic for other intents
            }

            if (intents.rotateLeft) {
                angularVelocity.degrees -= acceleration.angularAcceleration;
                if (angularVelocity.degrees < -acceleration.maxAngularSpeed) {
                    angularVelocity.degrees = -acceleration.maxAngularSpeed;
                }
            } else if (intents.rotateRight) {
                angularVelocity.degrees += acceleration.angularAcceleration;
                if (angularVelocity.degrees > acceleration.maxAngularSpeed) {
                    angularVelocity.degrees = acceleration.maxAngularSpeed;
                }
            } else {
                // Apply angular deceleration
                // Similar logic for other intents
            } */
        }
    }
}