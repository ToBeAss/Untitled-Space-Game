import { SceneEntity } from "../entities/sceneEntity.js";
import { inputEntity } from "../main.js"; 
import { canvasEntity } from "../main.js";
import { CameraSystem } from "../systems/cameraSystem.js";
import { HUDSystem } from "../systems/hudSystem.js";
import { RenderingSystem } from "../systems/renderingSystem.js";
import { sceneManager } from "../main.js";

export function initGameOverScene()
{
    // Create Scene
    let gameOverScene = new SceneEntity("Game Over");
    
    // Initialize Systems
    let renderingSystem = new RenderingSystem(canvasEntity);
    let hudSystem = new HUDSystem(canvasEntity);
    let cameraSystem = new CameraSystem(canvasEntity);

    // Add update instructions
    gameOverScene.addUpdateInstruction(() => {
        // Test
        renderingSystem.resetCanvas();
        cameraSystem.static();
        cameraSystem.timedZoom(0.5, 2, 3000, sceneManager.sceneDuration);
        hudSystem.drawText("Game Over!", {x: 0, y: 0}, {x: 0, y: 0}, "red", 24);
        hudSystem.drawText("You died", {x: 0, y: 24}, {x: 0, y: 0}, "red", 12);
    });

    return gameOverScene;
}