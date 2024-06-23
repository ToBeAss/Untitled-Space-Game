import { Entity } from "./Entity.js";

export class SceneEntity extends Entity
{
    constructor(name)
    {
        super("SceneEntity");
        this.name = name;
        this.hasBeenInitialized = false;
        this.initInstructions = [];
        this.fixedUpdateInstructions = [];
        this.updateInstructions = [];
    }

    addInitInstruction(instruction) 
    {
        this.initInstructions.push(instruction);
    }

    addFixedInstruction(instruction) 
    {
        this.fixedUpdateInstructions.push(instruction);
    }

    addUpdateInstruction(instruction) 
    {
        this.updateInstructions.push(instruction);
    }

    runInitInstructions() 
    {
        this.initInstructions.forEach(instruction => instruction());
    }

    runFixedUpdateInstructions() 
    {
        this.fixedUpdateInstructions.forEach(instruction => instruction());
    }

    runUpdateInstructions() 
    {
        this.updateInstructions.forEach(instruction => instruction());
    }
}