import { AsteroidEntity } from "../entities/asteroidEntity.js";
import { SceneEntity } from "../entities/sceneEntity.js";
import { ShipEntity } from "../entities/shipEntity.js";
import { sceneManager } from "../main.js";
import { inputEntity } from "../main.js";
import { canvasEntity } from "../main.js";
import { CameraSystem } from "../systems/cameraSystem.js";
import { CollisionSystem } from "../systems/collisionSystem.js";
import { DamageSystem } from "../systems/damageSystem.js";
import { EnemySystem } from "../systems/enemySystem.js";
import { HUDSystem } from "../systems/hudSystem.js";
import { InputSystem } from "../systems/inputSystem.js";
import { LaserSystem } from "../systems/laserSystem.js";
import { MovementSystem } from "../systems/movementSystem.js";
import { RenderingSystem } from "../systems/renderingSystem.js";

export function initSpaceScene()
{
    // Create Scene
    let spaceScene = new SceneEntity("Space");

    // Initialize Systems
    let inputSystem = new InputSystem(inputEntity);
    let renderingSystem = new RenderingSystem(canvasEntity);
    let hudSystem = new HUDSystem(canvasEntity);
    let cameraSystem = new CameraSystem(canvasEntity);
    let movementSystem = new MovementSystem();
    let enemySystem = new EnemySystem();
    let collisionSystem = new CollisionSystem();
    let damageSystem = new DamageSystem();
    let laserSystem = new LaserSystem();


    // Add init instructions
    spaceScene.addInitInstruction(() => {
        let player = new ShipEntity("ship.png", {x: 0, y: 0});

        let enemies = [];
        for (let i = 0; i < 2; i++) { // Number of enemies
            let x = Math.random() * 400 - 200;
            enemies.push(new ShipEntity("enemy.png", {x: x, y: 0}));
        }

        let asteroids = [];
        for (let i = 0; i < 10; i++) { // Number of asteroids
            let x = Math.random() * 800-400;
            let y = Math.random() * 800-400;
            let size = Math.random() * 50 + 100;
            asteroids.push(new AsteroidEntity("asteroid.png", {x: x, y: y}, size));
        }

        // Make function to generate systems and planets
        sceneManager.currentSystem = {
            player: player,
            asteroids: asteroids,
            enemies: enemies,
            deadEnemies: []
        }
    });


    // Add fixed update instructions
    spaceScene.addFixedInstruction(() => {
        // Check if player is dead
        if (damageSystem.checkIfDead(sceneManager.currentSystem.player)) sceneManager.switchScene("Game Over");
        
        // Handle input logic
        const playerIntents = inputSystem.generateIntents();
        movementSystem.processIntents(sceneManager.currentSystem.player, playerIntents);
        laserSystem.processIntents(sceneManager.currentSystem.player, playerIntents);

        // Handle lasers
        laserSystem.laserArray.forEach(function(laser, index) {
            // Manage lifespan
            laserSystem.updateLifeSpan(laser);

            // Check collisions
            let entityArray = [sceneManager.currentSystem.player, ...sceneManager.currentSystem.asteroids, ...sceneManager.currentSystem.enemies, ...sceneManager.currentSystem.deadEnemies];
            entityArray.forEach(function(entity) {
                let collisionResult = collisionSystem.checkCircularCollision(laser, entity);
                if (collisionResult.collision) {
                    damageSystem.dealDamage(entity, 2.5);
                    laserSystem.laserArray.splice(index, 1);
                }
            });

            // Move laser
            movementSystem.moveEntity(laser);
        });

        // Handle asteroids
        sceneManager.currentSystem.asteroids.forEach(function(asteroid) {
            // Check collisions
            let entityArray = [sceneManager.currentSystem.player, ...sceneManager.currentSystem.enemies];
            entityArray.forEach(function(entity) {
                let collisionResult = collisionSystem.checkCircularCollision(asteroid, entity);
                if (collisionResult.collision) {
                    damageSystem.dealDamage(entity, 0.25);
                    // Needs fixing:
                    //movementSystem.bounceEntity(sceneManager.currentSystem.player, collisionResult.normal);
                }
            });

            // Move asteroids
            movementSystem.rotateEntity(asteroid);
            movementSystem.moveEntity(asteroid);
        });

        // Handle enemies
        sceneManager.currentSystem.enemies.forEach(function(enemy, index) {
            // Remove enemy if dead
            if (damageSystem.checkIfDead(enemy)) {
                let deadEnemy = sceneManager.currentSystem.enemies.splice(index, 1)[0];
                sceneManager.currentSystem.deadEnemies.push(deadEnemy);
            }

            // Check for collisions
            /*
            let entityArray = [sceneManager.currentSystem.player, ...sceneManager.currentSystem.enemies];
            entityArray.forEach(function(entity) {
                if (entity != enemy) {
                    let collisionResult = collisionSystem.checkCircularCollision(enemy, entity);
                    if (collisionResult.collision) {
                        damageSystem.dealDamage(enemy, 0.01);
                        damageSystem.dealDamage(entity, 0.01);
                    }
                }
            });
            */

            // Handle enemy logic
            const enemyIntents = enemySystem.generateIntents();
            movementSystem.processIntents(enemy, enemyIntents);

            // Move enemies
            movementSystem.rotateEntity(enemy);
            movementSystem.moveEntity(enemy);
        });
        // Handle dead enemies
        sceneManager.currentSystem.deadEnemies.forEach(function(enemy) {
            movementSystem.processIntents(enemy, {});
            movementSystem.rotateEntity(enemy);
            movementSystem.moveEntity(enemy);
        });

        // Move player
        movementSystem.rotateEntity(sceneManager.currentSystem.player);
        movementSystem.moveEntity(sceneManager.currentSystem.player);
    });


    // Add update instructions
    spaceScene.addUpdateInstruction(() => {
        // Clear canvas
        renderingSystem.resetCanvas();
        canvasEntity.fillCanvas("black");
        
        // Camera logic
        cameraSystem.follow(sceneManager.currentSystem.player, false);

        // Render Entities
        laserSystem.laserArray.forEach(function(laser) {
            renderingSystem.drawLaser(laser);
        });

        let entityArray = [...sceneManager.currentSystem.asteroids, ...sceneManager.currentSystem.deadEnemies, ...sceneManager.currentSystem.enemies, sceneManager.currentSystem.player];
        entityArray.forEach(function(entity) {
            renderingSystem.renderEntity(entity);
            hudSystem.displayHealth(entity);
        });
    });

    return spaceScene;
}