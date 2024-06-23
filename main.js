import { CanvasEntity } from './entities/canvasEntity.js';
import { InputEntity } from './entities/inputEntity.js';

import { SceneSystem } from './systems/sceneSystem.js';
import { AssetSystem } from './systems/assetSystem.js';
import { MeshComponent } from './components/meshComponent.js';

import { AsteroidEntity } from './entities/asteroidEntity.js';
import { ShipEntity } from './entities/shipEntity.js';

import { initGameOverScene } from './scenes/gameOverScene.js';
import { initPlanetScene } from './scenes/planetScene.js';
import { initDragRaceScene } from './scenes/dragRaceScene.js';
import { initSpaceScene } from './scenes/spaceScene.js';


// Global System Entities
export var inputEntity = new InputEntity();
export var canvasEntity = new CanvasEntity(window.innerWidth, window.innerHeight);


// Temporary resize func
onresize = function() {
    canvasEntity.setSize(window.innerWidth, window.innerHeight);
}

// Initialize Entities
// Should probably do per scene?
let playerShip = new ShipEntity("ship.png", {x: 0, y: 0});
let enemyArray = [];
let deadEnemyArray = [];
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


// Handle game assets
// Assets should self initialize from component?
export var assetManager = new AssetSystem();

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
    sceneManager.sceneDuration += deltaTime;
    sceneManager.runUpdateInstructions();

    // Request the next frame
    requestAnimationFrame(update);
}


// Handle game scenes
export var sceneManager = new SceneSystem();

// Handle initial system generation
const STAR_SYSTEMS = {
    default: {
        player: playerShip,
        asteroids: asteroidArray,
        enemies: enemyArray,
        deadEnemies: deadEnemyArray
    }
}
sceneManager.currentSystem = STAR_SYSTEMS.default;

// Add scenes to sceneManager
sceneManager.addScene(initSpaceScene());
sceneManager.addScene(initPlanetScene());
sceneManager.addScene(initGameOverScene());
sceneManager.addScene(initDragRaceScene()); // bonus scene

// Set default scene
sceneManager.switchScene("Space");