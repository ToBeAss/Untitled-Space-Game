import { KeyboardComponent } from "../components/keyboardComponent.js";
import { MouseComponent } from "../components/mouseComponent.js";
import { Entity } from "./Entity.js";

export class InputEntity extends Entity
{
    constructor()
    {
        super();
        this.addComponent(new MouseComponent());
        this.addComponent(new KeyboardComponent());
    }
}