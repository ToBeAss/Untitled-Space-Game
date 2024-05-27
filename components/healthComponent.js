export class HealthComponent
{
    constructor(maxHealth)
    {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.isBeingDamaged = false;
    }
}