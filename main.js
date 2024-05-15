import { CanvasEntity } from './entities/canvasEntity.js';
import { CanvasSystem } from './systems/canvasSystem.js';

let canvasEntity = new CanvasEntity();
let canvasSystem = new CanvasSystem(canvasEntity);

canvasSystem.setSize(400, 400);