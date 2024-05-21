import { AngularVelocityComponent } from "../components/angularVelocityComponent.js";
import { KeyboardComponent } from "../components/keyboardComponent.js";
import { MouseComponent } from "../components/mouseComponent.js";
import { VelocityComponent } from "../components/velocityComponent.js";

export class InputSystem
{
    constructor(inputEntity)
    {
        this.inputEntity = inputEntity;
        this.initMouse();
        this.initKeyboard();
    }

    initMouse() 
    {
        const mouse = this.inputEntity.getComponent(MouseComponent);
        
        if (mouse)
        {
            window.addEventListener('mousemove', (event) => {
                mouse.x = event.clientX;
                mouse.y = event.clientY;
            });
    
            window.addEventListener('mousedown', () => {
                mouse.isPressed = true;
            });
    
            window.addEventListener('mouseup', () => {
                mouse.isPressed = false;
            });
        }
    }

    initKeyboard() 
    {
        const keyboard = this.inputEntity.getComponent(KeyboardComponent);

        if (keyboard)
        {
            window.addEventListener('keydown', (event) => {
                keyboard.keys[event.key] = true;
            });
    
            window.addEventListener('keyup', (event) => {
                keyboard.keys[event.key] = false;
            });
        }
    }

    isKeyPressed(key) 
    {
        const keyboard = this.inputEntity.getComponent(KeyboardComponent);
        if (keyboard) return keyboard.keys[key] || false;
    }

    getMousePosition() 
    {
        const mouse = this.inputEntity.getComponent(MouseComponent);
        if (mouse) return { x: mouse.x, y: mouse.y, isPressed: mouse.isPressed };
    }

    generateIntents() {
        const keyboard = this.inputEntity.getComponent(KeyboardComponent);
        if (keyboard) {
            const intents = {};

            if (keyboard.keys['w']) {
                intents.moveUp = true;
            }
            if (keyboard.keys['s']) {
                intents.moveDown = true;
            }
            if (keyboard.keys['a']) {
                intents.rotateLeft = true;
            }
            if (keyboard.keys['d']) {
                intents.rotateRight = true;
            }

            return intents;
        }
        return {};
    }
}