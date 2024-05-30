import { CollisionComponent } from "../components/collisionComponent.js";
import { LifeSpanComponent } from "../components/lifeSpanComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { WeaponComponent } from "../components/weaponComponent.js";
import { LaserEntity } from "../entities/laserEntity.js";

export class LaserSystem
{
    constructor()
    {
        this.laserArray = [];
    }

    processIntents(entity, intents)
    {
        const position = entity.getComponent(PositionComponent);
        const rotation = entity.getComponent(RotationComponent);
        const collision = entity.getComponent(CollisionComponent);
        const weapon = entity.getComponent(WeaponComponent);

        if (position && rotation && collision && weapon) 
        {
            if (intents.shoot && weapon.isReady) 
            {
                let pos = {x: position.x, y: position.y};
                // Add offset to avoid hitting yourself
                let offset = -(collision.radius * 1.1);
                pos.x -= offset * Math.sin(rotation.radians);
                pos.y += offset * Math.cos(rotation.radians);

                let laser = new LaserEntity(pos, rotation.degrees, "red");
                this.laserArray.push(laser);

                weapon.isReady = false;
                setTimeout(function() {weapon.isReady = true}, weapon.cooldown);
            }
        }
    }

    updateLifeSpan(laserEntity)
    {
        const lifeSpan = laserEntity.getComponent(LifeSpanComponent);
        if (lifeSpan)
        {
            lifeSpan.lifeSpan++;
            if (lifeSpan.lifeSpan >= lifeSpan.maxLifeSpan) {
                lifeSpan.isDead = true;
                let index = this.laserArray.indexOf(laserEntity);
                this.laserArray.splice(index, 1);
            }
        }
    }
}