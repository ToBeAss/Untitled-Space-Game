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
        this.runInitInstructions(); // might be bad
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