export class LifeSpanComponent
{
    constructor(maxLifeSpan)
    {
        this.maxLifeSpan = maxLifeSpan;
        this.lifeSpan = 0;
        this.isDead = false;
    }
}