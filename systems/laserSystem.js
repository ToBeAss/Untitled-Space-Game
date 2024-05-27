import { LifeSpanComponent } from "../components/lifeSpanComponent.js";
import { PositionComponent } from "../components/positionComponent.js";
import { RotationComponent } from "../components/rotationComponent.js";
import { WeaponComponent } from "../components/weaponComponent.js";
import { LaserEntity } from "../entities/laserEntity.js";

export class LaserSystem
{
    constructor(collisionSystem, damageSystem)
    {
        this.laserArray = [];
        this.collisionSystem = collisionSystem;
        this.damageSystem = damageSystem;
    }

    processIntents(entity, intents)
    {
        const position = entity.getComponent(PositionComponent);
        const rotation = entity.getComponent(RotationComponent);
        const weapon = entity.getComponent(WeaponComponent);

        if (position && rotation && weapon) 
        {
            if (intents.shoot && weapon.isReady) 
            {
                let pos = {x: position.x, y: position.y};
                let laser = new LaserEntity(pos, rotation.degrees, "red");
                this.laserArray.push(laser);
                weapon.isReady = false;
                setTimeout(function(){weapon.isReady = true}, weapon.cooldown);
            }
        }
    }

    handleCollisions(laserEntity, entityArray)
    {
        let lasers = this.laserArray;
        let collisionSystem = this.collisionSystem;
        let damageSystem = this.damageSystem;

        const lifeSpan = laserEntity.getComponent(LifeSpanComponent);

        if (lifeSpan.lifeSpan > 7) { // Maybe change to laser signaute solution
            entityArray.forEach(function(entity) {
                let collisionResult = collisionSystem.checkCircularCollision(laserEntity, entity);
                if (collisionResult.collision) {
                    damageSystem.dealDamage(entity, 2.5);
                    let index = lasers.indexOf(laserEntity);
                    lasers.splice(index, 1);
                }
            });
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