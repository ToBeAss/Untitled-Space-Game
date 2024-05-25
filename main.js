import { MeshComponent } from './components/meshComponent.js';
import { CameraSystem } from './systems/cameraSystem.js';
import { CanvasEntity } from './entities/canvasEntity.js';
import { PlayerEntity } from './entities/playerEntity.js';
import { AssetSystem } from './systems/assetSystem.js';
import { CanvasSystem } from './systems/canvasSystem.js';
import { MovementSystem } from './systems/movementSystem.js';
import { InputEntity } from './entities/inputEntity.js';
import { InputSystem } from './systems/inputSystem.js';
import { SceneSystem } from './systems/sceneSystem.js';
import { SceneEntity } from './entities/sceneEntity.js';

// Initialize Entities
let inputEntity = new InputEntity();
let canvasEntity = new CanvasEntity(400, 400);
let playerEntity = new PlayerEntity();

// Initialize Systems
let inputSystem = new InputSystem(inputEntity);
let canvasSystem = new CanvasSystem(canvasEntity);
let cameraSystem = new CameraSystem(canvasEntity);
let movementSystem = new MovementSystem();

// Handle game assets
let assetSystem = new AssetSystem();
let playerMesh = playerEntity.getComponent(MeshComponent);
assetSystem.addAsset(playerMesh);

assetSystem.loadAll().then(() => {  
    update(performance.now()); // Start game loop
}).catch(error => {
    console.error("Error loading assets", error);
});


// Handle game scenes
let sceneSystem = new SceneSystem();
let spaceScene = new SceneEntity("Space");

// Add fixed update instructions
spaceScene.addFixedInstruction(() => {
    // Handle input logic
    const playerIntents = inputSystem.generateIntents();
    movementSystem.processIntents(playerEntity, playerIntents);

    // Move Entities
    movementSystem.rotateEntity(playerEntity);
    movementSystem.moveEntity(playerEntity);
});

// Add regular update instructions
spaceScene.addUpdateInstruction(() => {
    // Clear canvas
    canvasSystem.resetCanvas();
    
    // Camera logic
    cameraSystem.follow(playerEntity);

    // Render Entities
    canvasSystem.renderEntity(playerEntity);
});

// Add the scene to the manager and set it as the current scene
sceneSystem.addScene(spaceScene);
sceneSystem.switchScene("Space");


// Setup for fixedUpdate interval
const fixedUpdateInterval = 1000 / 50;
let lastTime = performance.now();
let accumulatedTime = 0;


function fixedUpdate()
{
    // Scene logic
    sceneSystem.runFixedUpdateInstructions();
}

function update(currentTime)
{
    // Calculate the elapsed time since the last frame
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Accumulate elapsed time
    accumulatedTime += deltaTime;

    // Run the fixedUpdate loop as many times as needed
    while (accumulatedTime >= fixedUpdateInterval) {
        fixedUpdate();
        accumulatedTime -= fixedUpdateInterval;
    }
    
    // Scene logic
    sceneSystem.runUpdateInstructions();

    // Request the next frame
    requestAnimationFrame(update);
}