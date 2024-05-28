import { MeshComponent } from './components/meshComponent.js';
import { CameraSystem } from './systems/cameraSystem.js';
import { CanvasEntity } from './entities/canvasEntity.js';
import { ShipEntity } from './entities/shipEntity.js';
import { AssetSystem } from './systems/assetSystem.js';
import { RenderingSystem } from './systems/renderingSystem.js';
import { MovementSystem } from './systems/movementSystem.js';
import { InputEntity } from './entities/inputEntity.js';
import { InputSystem } from './systems/inputSystem.js';
import { SceneSystem } from './systems/sceneSystem.js';
import { SceneEntity } from './entities/sceneEntity.js';
import { EnemySystem } from './systems/enemySystem.js';
import { AsteroidEntity } from './entities/asteroidEntity.js';
import { CollisionSystem } from './systems/collisionSystem.js';
import { DamageSystem } from './systems/damageSystem.js';
import { LaserSystem } from './systems/laserSystem.js';
import { HUDSystem } from './systems/hudSystem.js';

// Initialize Entities
let inputEntity = new InputEntity();
let canvasEntity = new CanvasEntity(400, 400);
let playerShip = new ShipEntity("ship.png", {x: 0, y: 0});
let enemyArray = [];
for (let i = 0; i < 2; i++) { // Number of enemies
    let x = Math.random() * 400 - 200;
    enemyArray.push(new ShipEntity("enemy.png", {x: x, y: 0}));
}
let asteroidArray = [];
for (let i = 0; i < 10; i++) { // Number of asteroids
    let x = Math.random() * 800-400;
    let y = Math.random() * 800-400;
    let size = Math.random() * 50 + 100;
    asteroidArray.push(new AsteroidEntity("asteroid.png", {x: x, y: y}, size));
}

// Initialize Systems
let inputSystem = new InputSystem(inputEntity);
let renderingSystem = new RenderingSystem(canvasEntity);
let hudSystem = new HUDSystem(canvasEntity);
let cameraSystem = new CameraSystem(canvasEntity);
let movementSystem = new MovementSystem();
let enemySystem = new EnemySystem();
let collisionSystem = new CollisionSystem();
let damageSystem = new DamageSystem();
let laserSystem = new LaserSystem(collisionSystem, damageSystem);


// Handle game assets
let assetManager = new AssetSystem();
let playerMesh = playerShip.getComponent(MeshComponent);
assetManager.addAsset(playerMesh);
enemyArray.forEach(function(enemy) {
    let enemyMesh = enemy.getComponent(MeshComponent);
    assetManager.addAsset(enemyMesh);
});
asteroidArray.forEach(function(asteroid) {
    let asteroidMesh = asteroid.getComponent(MeshComponent);
    assetManager.addAsset(asteroidMesh);
});


assetManager.loadAll().then(() => {  
    update(performance.now()); // Start game loop
}).catch(error => {
    console.error("Error loading assets", error);
});


// Setup for fixedUpdate interval
const fixedUpdateInterval = 1000 / 50;
let lastTime = performance.now();
let accumulatedTime = 0;

// Game loop
function fixedUpdate()
{
    // Scene logic
    sceneManager.runFixedUpdateInstructions();
}

function update(currentTime)
{
    // Calculate the elapsed time since the last frame and accumulate elapsed time
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulatedTime += deltaTime;

    // Run the fixedUpdate loop as many times as needed
    while (accumulatedTime >= fixedUpdateInterval) {
        fixedUpdate();
        accumulatedTime -= fixedUpdateInterval;
    }
    
    // Scene logic
    sceneManager.runUpdateInstructions();

    // Request the next frame
    requestAnimationFrame(update);
}


// Handle game scenes
let sceneManager = new SceneSystem();

// SCENES:
// - - - - - - - - - -
// SPACE SCENE
    let spaceScene = new SceneEntity("Space");

    spaceScene.addFixedInstruction(() => {
        // Handle input logic
        const playerIntents = inputSystem.generateIntents();
        movementSystem.processIntents(playerShip, playerIntents);
        laserSystem.processIntents(playerShip, playerIntents);

        // Move player
        movementSystem.rotateEntity(playerShip);
        movementSystem.moveEntity(playerShip);

        // Handle lasers
        laserSystem.laserArray.forEach(function(laser) {
            // Manage lifespan
            laserSystem.updateLifeSpan(laser);

            // Check collisions
            let entityArray = [playerShip, ...enemyArray, ...asteroidArray];
            laserSystem.handleCollisions(laser, entityArray);
            
            // Move laser
            movementSystem.moveEntity(laser);
        });

        // Handle asteroids
        asteroidArray.forEach(function(asteroid) {
            // Check for player collision
            let collisionResult = collisionSystem.checkCircularCollision(asteroid, playerShip);
            if (collisionResult.collision) {
                damageSystem.dealDamage(playerShip, 0.25);
            // Needs fixing:
                //movementSystem.bounceEntity(playerShip, collisionResult.normal);
            }

            // Check for enemy collisions
            enemyArray.forEach(function(enemy) {
                let collisionResult = collisionSystem.checkCircularCollision(asteroid, enemy);
                if (collisionResult.collision) {
                    damageSystem.dealDamage(enemy, 0.25);
                }
            });

            // Move asteroids
            movementSystem.rotateEntity(asteroid);
            movementSystem.moveEntity(asteroid);
        });

        // Handle enemies
        enemyArray.forEach(function(enemy) {
            // Check for player collision?

            // Handle enemy logic
            const enemyIntents = enemySystem.generateIntents();
            movementSystem.processIntents(enemy, enemyIntents);

            // Move enemies
            movementSystem.rotateEntity(enemy);
            movementSystem.moveEntity(enemy);
        });
    });

    spaceScene.addUpdateInstruction(() => {
        // Clear canvas
        renderingSystem.resetCanvas();
        
        // Camera logic
        cameraSystem.follow(playerShip, false);

        // Render Entities
        asteroidArray.forEach(function(asteroid) {
            renderingSystem.renderEntity(asteroid, false);
        });

        laserSystem.laserArray.forEach(function(laser) {
            renderingSystem.drawLaser(laser);
        });

        enemyArray.forEach(function(enemy) {
            renderingSystem.renderEntity(enemy, false);
            hudSystem.displayHealth(enemy);
        });

        renderingSystem.renderEntity(playerShip, false);
        hudSystem.displayHealth(playerShip);
    });
// - - - - - - - - - -
// PLANET SCENE
    let planetScene = new SceneEntity("Planet");

    planetScene.addUpdateInstruction(() => {
        // Test
        canvasEntity.clearCanvas();
        canvasEntity.fillCanvas("cyan");
    });
// - - - - - - - - - -
// DRAG RACE SCENE
    let dragRaceScene = new SceneEntity("Drag Race");

    dragRaceScene.addFixedInstruction(() => {
        let bools = [true, false];
        enemyArray.forEach(function(enemy) {
            // Handle enemy logic
            let boost = bools[Math.round(Math.random() + 0.25)];
            const enemyIntents = {moveUp: true, boost: boost};
            movementSystem.processIntents(enemy, enemyIntents);

            // Move enemies
            movementSystem.rotateEntity(enemy);
            movementSystem.moveEntity(enemy);
        });

        // Handle input logic
        const playerIntents = inputSystem.generateIntents();
        movementSystem.processIntents(playerShip, playerIntents);

        // Move player
        movementSystem.rotateEntity(playerShip);
        movementSystem.moveEntity(playerShip);
    });

    dragRaceScene.addUpdateInstruction(() => {
        // Clear canvas
        renderingSystem.resetCanvas();
        
        // Camera logic
        cameraSystem.follow(playerShip);

        // Render Entities
        enemyArray.forEach(function(enemy) {
            renderingSystem.renderEntity(enemy);
        });

        renderingSystem.renderEntity(playerShip);
    });
// - - - - - - - - - -

// Add scenes to sceneManager
sceneManager.addScene(spaceScene);
sceneManager.addScene(planetScene);
sceneManager.addScene(dragRaceScene); // bonus scene

// Set active scene
sceneManager.switchScene("Space");