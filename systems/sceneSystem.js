export class SceneSystem
{
    constructor()
    {
        this.scenes = new Map();
        this.currentScene = null;
    }

    addScene(sceneEntity) 
    {
        this.scenes.set(sceneEntity.name, sceneEntity);
    }

    switchScene(sceneName) 
    {
        this.currentScene = this.scenes.get(sceneName);
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