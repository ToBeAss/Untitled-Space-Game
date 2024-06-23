import { AsteroidEntity } from "../entities/asteroidEntity.js";

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export class WorldGenerationSystem
{
    constructor()
    {
        this.galaxies = new Map();
        this.systems = new Map();
        this.planets = new Map();
    }

    generatePlanet(name, size, numberOfMoons = 0)
    {

        this.planets.set(name, {});
    }

    generateSystem(name, size, numberOfSuns = 1, numberOfPlanets = 0, numberOfAsteroids = 0)
    {
        let suns = {};
        for (let i = 0; i < numberOfSuns; i++)
        {
            let n = name + " " + i;
            suns[n] = this.generatePlanet(n, 100);
        }
        let planets = {};
        for (let i = 0; i < numberOfPlanets; i++)
        {
            let n = name + " " + alphabet[i];
            planets[n] = this.generatePlanet(n, 50);
        }
        let asteroids = [];
        for (let i = 0; i < numberOfAsteroids; i++)
        {
            let x = Math.random() * size-size/2;
            let y = Math.random() * size-size/2;
            let r = Math.random() * 50 + 100;
            asteroids.push(new AsteroidEntity("asteroid.png", {x: x, y: y}, r));
        }
        this.systems.set(name, {suns: suns, planets: planets, asteroids: asteroids});
    }

    generateGalaxy(name, size, numberOfBlackHoles = 1, numberOfSystems = 0, numberOfNebulas = 0)
    {

        this.galaxies.set(name, {});
    }

    getPlanet(name)
    {
        return this.planets.get(name);
    }
    getSystem(name)
    {
        return this.systems.get(name);
    }
    getGalaxy(name)
    {
        return this.galaxies.get(name);
    }
}