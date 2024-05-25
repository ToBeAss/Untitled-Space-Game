export class EnemySystem
{
    constructor()
    {}

    generateIntents()
    {
        // tests
        let bools = [true, false]
        let left = bools[Math.round(Math.random())];
        let intents = {moveUp: true, rotateRight: !left, rotateLeft: left};
        return intents;
    }
}