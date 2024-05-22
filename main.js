import { MeshComponent } from './components/meshComponent.js';
import { CameraSystem } from './systems/cameraSystem.js';
import { CanvasEntity } from './entities/canvasEntity.js';
import { PlayerEntity } from './entities/playerEntity.js';
import { Preloader } from './preloader.js';
import { CanvasSystem } from './systems/canvasSystem.js';
import { MovementSystem } from './systems/movementSystem.js';
import { InputEntity } from './entities/inputEntity.js';
import { InputSystem } from './systems/inputSystem.js';

// Initialize Entities
let inputEntity = new InputEntity();
let canvasEntity = new CanvasEntity(400, 400);
let playerEntity = new PlayerEntity();

// Initialize Systems
let inputSystem = new InputSystem(inputEntity);
let canvasSystem = new CanvasSystem(canvasEntity);
let cameraSystem = new CameraSystem(canvasEntity);
let movementSystem = new MovementSystem();


let preloader = new Preloader();
let playerMesh = playerEntity.getComponent(MeshComponent);
preloader.addAsset(playerMesh);


preloader.loadAll().then(() => {
    // game loop
    update(performance.now());
    
}).catch(error => {
    console.error("Error loading assets", error);
});


const fixedUpdateInterval = 1000 / 50;
let lastTime = performance.now();
let accumulatedTime = 0;


function fixedUpdate()
{
    // Handle input logic
    const playerIntents = inputSystem.generateIntents();
    movementSystem.processIntents(playerEntity, playerIntents);

    // Move Entities
    movementSystem.rotateEntity(playerEntity);
    movementSystem.moveEntity(playerEntity);
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
    
    // Clear canvas
    canvasSystem.resetCanvas();
    
    // Camera logic
    cameraSystem.follow(playerEntity);

    // Render Entities
    canvasSystem.renderEntity(playerEntity);

    // Request the next frame
    requestAnimationFrame(update);
}