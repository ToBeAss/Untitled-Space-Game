import { SceneEntity } from "../entities/sceneEntity.js";
import { sceneManager } from "../main.js";
import { inputEntity } from "../main.js";
import { canvasEntity } from "../main.js";
import { CameraSystem } from "../systems/cameraSystem.js";
import { InputSystem } from "../systems/inputSystem.js";
import { MovementSystem } from "../systems/movementSystem.js";
import { RenderingSystem } from "../systems/renderingSystem.js";

export function initDragRaceScene()
{
    // Create Scene
    let dragRaceScene = new SceneEntity("Drag Race");

    // Initialize Systems
    let renderingSystem = new RenderingSystem(canvasEntity);
    let cameraSystem = new CameraSystem(canvasEntity);
    let inputSystem = new InputSystem(inputEntity);
    let movementSystem = new MovementSystem();

    // Add fixed update instructions
    dragRaceScene.addFixedInstruction(() => {
        let bools = [true, false];
        sceneManager.currentSystem.enemies.forEach(function(enemy) {
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
        movementSystem.processIntents(sceneManager.currentSystem.player, playerIntents);

        // Move player
        movementSystem.rotateEntity(sceneManager.currentSystem.player);
        movementSystem.moveEntity(sceneManager.currentSystem.player);
    });

    // Add update instructions
    dragRaceScene.addUpdateInstruction(() => {
        // Clear canvas
        renderingSystem.resetCanvas();
        canvasEntity.fillCanvas("black");
        
        // Camera logic
        cameraSystem.follow(sceneManager.currentSystem.player);

        // Render Entities
        sceneManager.currentSystem.enemies.forEach(function(enemy) {
            renderingSystem.renderEntity(enemy);
        });

        renderingSystem.renderEntity(sceneManager.currentSystem.player);
    });

    return dragRaceScene;
}