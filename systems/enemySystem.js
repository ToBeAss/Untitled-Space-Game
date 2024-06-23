export class EnemySystem
{
    constructor()
    {
        this.intents = {};
    }

    generateIntents()
    {
        // tests
        let bools = [true, false]
        let left = bools[Math.round(Math.random())];
        this.intents = {moveUp: true, rotateRight: !left, rotateLeft: left};
        return this.intents;
    }
}