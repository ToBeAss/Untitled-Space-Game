import { KeyboardComponent } from "../components/keyboardComponent.js";
import { MouseComponent } from "../components/mouseComponent.js";

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
                event.preventDefault();
                keyboard.keys[event.code] = true;
            });
    
            window.addEventListener('keyup', (event) => {
                keyboard.keys[event.code] = false;
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

            if (keyboard.keys['KeyW']) {
                intents.moveUp = true;
            }
            if (keyboard.keys['KeyS']) {
                intents.moveDown = true;
            }
            if (keyboard.keys['KeyA']) {
                intents.rotateLeft = true;
            }
            if (keyboard.keys['KeyD']) {
                intents.rotateRight = true;
            }
            if (keyboard.keys['ShiftLeft']) {
                intents.boost = true;
            }
            if (keyboard.keys['Space']) {
                intents.shoot = true;
            }

            return intents;
        }
        return {};
    }
}