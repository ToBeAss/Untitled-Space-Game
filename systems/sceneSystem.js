import { assetManager } from "../main.js";

export class SceneSystem
{
    constructor()
    {
        this.scenes = new Map();
        this.currentScene = null;
        this.sceneDuration = 0;
        this.currentSystem = null;
        this.currentPlanet = null;
    }

    addScene(sceneEntity) 
    {
        this.scenes.set(sceneEntity.name, sceneEntity);
    }

    switchScene(sceneName) 
    {
        this.currentScene = this.scenes.get(sceneName);
        this.sceneDuration = 0;
        if (this.currentScene.hasBeenInitialized === false) 
        {
            this.currentScene.hasBeenInitialized = true;
            this.currentScene.runInitInstructions();
            
            // Load new assets
            assetManager.loadAll().catch(error => {
                console.error("Error loading assets", error);
            });
            console.log("Loaded assets: " + assetManager.assets.length);
        }
    }

    runInitInstructions() 
    {
        if (this.currentScene) 
        {
            this.currentScene.runInitInstructions();
        }
    }

    runFixedUpdateInstructions() 
    {
        if (this.currentScene) 
        {
            this.currentScene.runFixedUpdateInstructions();
        }
    }

    runUpdateInstructions() 
    {
        if (this.currentScene) 
        {
            this.currentScene.runUpdateInstructions();
        }
    }
}