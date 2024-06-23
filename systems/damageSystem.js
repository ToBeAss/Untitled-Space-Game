import { HealthComponent } from "../components/healthComponent.js";

export class DamageSystem
{
    constructor()
    {}

    dealDamage(entity, damage = 0)
    {
        const health = entity.getComponent(HealthComponent);
        
        if (health && !entity.isDead) 
        {
            health.isBeingDamaged = true;
            setTimeout(function(){health.isBeingDamaged = false}, 100);

            health.health -= damage;
            if (health.health <= 0) health.health = 0;
        }
    }

    checkIfDead(entity)
    {
        const health = entity.getComponent(HealthComponent);
        if (health) 
        {
            if (health.health <= 0) return true;
            return false;
        }
    }
}