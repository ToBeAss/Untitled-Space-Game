const GAME_MODE = "testing";

const PLAYER_SETTINGS = {
    resolution: 1470
}

const SCALE = 1; // 1 for intended scale

const SCREEN_WIDTH = 1470 * SCALE; // 1080 by default // 1470 max
const SCREEN_RATIO = 16/9; // Standard 16:9
const SCREEN_HEIGHT = SCREEN_WIDTH / SCREEN_RATIO;

const GAME_SPEED = 30; // 30 for intended speed
const GAME_FPS = 60; // 60 by default
const GAME_UPDATE_SPEED = 1000 / GAME_FPS; // how many milliseconds between each update

var GAME_STATE = "playing";


const TEXT = {
    size: 20 * SCALE,
    font: "monaco",
    color: "white",
    lineSpacing: 3 * SCALE
}


const MAP_SIZE = 15000 * SCALE; // 15000
const MAP_MINIMAP_SIZE = 200 * SCALE; // 200


const gridView = false;