import { MeshComponent } from './components/meshComponent.js';
import { CameraSystem } from './systems/cameraSystem.js';
import { CanvasEntity } from './entities/canvasEntity.js';
import { ShipEntity } from './entities/shipEntity.js';
import { AssetSystem } from './systems/assetSystem.js';
import { CanvasSystem } from './systems/canvasSystem.js';
import { MovementSystem } from './systems/movementSystem.js';
import { InputEntity } from './entities/inputEntity.js';
import { InputSystem } from './systems/inputSystem.js';
import { SceneSystem } from './systems/sceneSystem.js';
import { SceneEntity } from './entities/sceneEntity.js';
import { EnemySystem } from './systems/enemySystem.js';


// Initialize Entities
let inputEntity = new InputEntity();
let canvasEntity = new CanvasEntity(400, 400);
let playerShip = new ShipEntity("ship.png", {x: 0, y: 0});
let enemyArray = [];
for (let i = 0; i < 0; i++) { // Number of enemies
    let x = Math.random() * 400 - 200;
    enemyArray.push(new ShipEntity("enemy.png", {x: x, y: 0}));
}

// Initialize Systems
let inputSystem = new InputSystem(inputEntity);
let canvasSystem = new CanvasSystem(canvasEntity);
let cameraSystem = new CameraSystem(canvasEntity);
let movementSystem = new MovementSystem();
let enemySystem = new EnemySystem();


// Handle game assets
let assetManager = new AssetSystem();
let playerMesh = playerShip.getComponent(MeshComponent);
assetManager.addAsset(playerMesh);
enemyArray.forEach(function(enemy) {
    let enemyMesh = enemy.getComponent(MeshComponent);
    assetManager.addAsset(enemyMesh);
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

// SPACE SCENE
    let spaceScene = new SceneEntity("Space");

    spaceScene.addFixedInstruction(() => {
        enemyArray.forEach(function(enemy) {
            // Handle enemy logic
            const enemyIntents = enemySystem.generateIntents();
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

    spaceScene.addUpdateInstruction(() => {
        // Clear canvas
        canvasSystem.resetCanvas();
        
        // Camera logic
        cameraSystem.follow(playerShip);

        // Render Entities
        enemyArray.forEach(function(enemy) {
            canvasSystem.renderEntity(enemy);
        });

        canvasSystem.renderEntity(playerShip);
    });

// PLANET SCENE
    let planetScene = new SceneEntity("Planet");

    planetScene.addUpdateInstruction(() => {
        // Test
        canvasSystem.resetCanvas();
        canvasSystem.fillCanvas("cyan");
    });

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
        canvasSystem.resetCanvas();
        
        // Camera logic
        cameraSystem.follow(playerShip);

        // Render Entities
        enemyArray.forEach(function(enemy) {
            canvasSystem.renderEntity(enemy);
        });

        canvasSystem.renderEntity(playerShip);
    });

// Add scenes to sceneManager
sceneManager.addScene(spaceScene);
sceneManager.addScene(planetScene);
sceneManager.addScene(dragRaceScene);

// Set active scene
sceneManager.switchScene("Space");