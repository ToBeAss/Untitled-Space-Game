import { CanvasEntity } from './entities/canvasEntity.js';
import { InputEntity } from './entities/inputEntity.js';
import { AssetSystem } from './systems/assetSystem.js';
import { SceneSystem } from './systems/sceneSystem.js';
import { WorldGenerationSystem } from './systems/worldGenerationSystem.js';

import { initGameOverScene } from './scenes/gameOverScene.js';
import { initPlanetScene } from './scenes/planetScene.js';
import { initDragRaceScene } from './scenes/dragRaceScene.js';
import { initSpaceScene } from './scenes/spaceScene.js';


// Setup for fixedUpdate interval
const fixedUpdateInterval = 1000 / 50;
let lastTime = performance.now();
let accumulatedTime = 0;


// Global system Entities
export var inputEntity = new InputEntity();
export var canvasEntity = new CanvasEntity(window.innerWidth, window.innerHeight);
// Global system Systems
export var assetManager = new AssetSystem();
export var sceneManager = new SceneSystem();
export var worldManager = new WorldGenerationSystem();


// Add scenes to sceneManager
sceneManager.addScene(initSpaceScene());
sceneManager.addScene(initPlanetScene());
sceneManager.addScene(initGameOverScene());
sceneManager.addScene(initDragRaceScene()); // bonus scene
// Set default scene
sceneManager.switchScene("Space");


// Load game assets and start game loop
assetManager.loadAll().then(() => {  
    update(performance.now());
}).catch(error => {
    console.error("Error loading assets", error);
});


function fixedUpdate()
{
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
    sceneManager.sceneDuration += deltaTime;
    sceneManager.runUpdateInstructions();

    // Request the next frame
    requestAnimationFrame(update);
}


// Temporary resize func
onresize = function() {
    canvasEntity.setSize(window.innerWidth, window.innerHeight);
}