let state;
let canvas;
let ctx;

const WORLD_SIZE = 50;
let tileSize = 50;
let offset = 0;

let layout = [];
for (let x = 0; x < WORLD_SIZE; x++) {
    layout[x] = [];
    for (let y = 0; y < WORLD_SIZE; y++) {
        layout[x][y] = null;
    }
}

layout[0][5] = "t";

function setTile(x, y, set) {
    layout[x][y] = set;
}

function getTile(x, y) {
    return layout[x][y];
}

export function click(mouseX, mouseY) {
    console.log(`Mouse X: ${mouseX} Y: ${mouseY}`)
    let tileX = Math.floor(mouseX / tileSize);
    let tileY = Math.floor(mouseY / tileSize);
    setTile(tileX, tileY, "s")
}

function getTileFromMouse(x, y) {
    return checkMouseClick(x, y);
}

function setUpMouseClickAvailability() {

}

export function setState(newState) {
    state = newState;
    canvas = state.canvas;
    ctx = state.ctx;
}

export function drawWorld() {
    let ctx = state.ctx;
    for (let x = 0; x < WORLD_SIZE; x++) {
        for (let y = 0; y < WORLD_SIZE; y++) {
            if (getTile(x, y) != null) {
                ctx.fillStyle = "lightblue";
            }
            else {
                ctx.fillStyle = "gray"
            }
            ctx.fillRect(offset + (x * tileSize), offset + (y * tileSize), tileSize, tileSize);
        }
    }
}