import { HealthComponent } from "../components/healthComponent.js";

export class DamageSystem
{
    constructor()
    {}

    dealDamage(entity, damage)
    {
        const health = entity.getComponent(HealthComponent);
        
        if (health) {
            health.isBeingDamaged = true;
            setTimeout(function(){health.isBeingDamaged = false}, 100);
            health.health -= damage;
            if (health.health <= 0) {
                health.health = 0;
                entity.isDead = true;
            }
        }
    }
}