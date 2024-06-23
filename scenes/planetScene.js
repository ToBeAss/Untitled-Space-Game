import { SceneEntity } from "../entities/sceneEntity.js";
import { canvasEntity } from "../main.js";

export function initPlanetScene()
{
    // Create Scene
    let planetScene = new SceneEntity("Planet");

    // Initialize Systems
    

    
    // Add update instructions
    planetScene.addUpdateInstruction(() => {
        // Test
        canvasEntity.clearCanvas();
        canvasEntity.fillCanvas("cyan");
    });

    return planetScene;
}