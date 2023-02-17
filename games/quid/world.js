import * as state from "./state.js";

let canvas = state.canvas;
let ctx = state.ctx;

const WORLD_SIZE = state.WORLD_SIZE;
let tileSize = state.tileSize;

let layout = [];
for (let x = 0; x < WORLD_SIZE; x++) {
    layout[x] = [];
    for (let y = 0; y < WORLD_SIZE; y++) {
        layout[x][y] = null;
    }
}

export function initWorld() {
    // setTile(0, 0, "ore");
}

export function setTile(x, y, set) {
    let tile = state.buildings.spawnBuilding(set, x, y);
    layout[x][y] = tile;
}

export function getTile(x, y) {
    return layout[x][y];
}

export function click(mouseX, mouseY) {
    let tileX = Math.floor(mouseX / tileSize);
    let tileY = Math.floor(mouseY / tileSize);
    setTile(tileX, tileY, "ore");
}

export function getTileFromMouse(mouseX, mouseY) {
    let tileX = Math.floor(mouseX / tileSize);
    let tileY = Math.floor(mouseY / tileSize);
    return getTile(tileX, tileY);
}

// TODO this
function setUpMouseClickAvailability() {

}

export function drawWorld() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (let x = 0; x < WORLD_SIZE; x++) {
        for (let y = 0; y < WORLD_SIZE; y++) {
            /** @type {Building} */
            let tile = getTile(x, y)
            if (tile != null) {
                tile.drawOnGrid();
            }
        }
    }
}

