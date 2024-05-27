import { Entity } from "./Entity.js";

export class SceneEntity extends Entity
{
    constructor(name)
    {
        super("SceneEntity");
        this.name = name;
        this.fixedUpdateInstructions = [];
        this.updateInstructions = [];
    }

    addFixedInstruction(instruction) 
    {
        this.fixedUpdateInstructions.push(instruction);
    }

    addUpdateInstruction(instruction) 
    {
        this.updateInstructions.push(instruction);
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