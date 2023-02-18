import * as vector from "../../common/vector.js";
import { BuildingData, buildings } from "./buildings.js";
const WORLD_SIZE = 50;
const DEFAULT_TILE_SIZE = 50;
export class World {
    constructor() {
        this.layout = new Array;
        this.worldSize = WORLD_SIZE;
        this.tileSize = DEFAULT_TILE_SIZE;
        this.offset = new vector.Pos(0, 0);
        for (let x = 0; x < WORLD_SIZE; x++) {
            this.layout[x] = [];
            for (let y = 0; y < WORLD_SIZE; y++) {
                this.layout[x][y] = null;
            }
        }
    }
    setTile(set, xOrPos, y) {
        if (set instanceof BuildingData) {
            set.spawn(xOrPos, y);
        }
        else {
            buildings.get(set).spawn(xOrPos, y);
        }
    }
    getTile(x, y) {
        return this.layout[x][y];
    }
    click(mouseX, mouseY) {
        let tileX = Math.floor(mouseX / this.tileSize);
        let tileY = Math.floor(mouseY / this.tileSize);
        this.setTile("ore", tileX, tileY);
    }
    getTileFromMouse(mouseX, mouseY) {
        let tileX = Math.floor(mouseX / this.tileSize);
        let tileY = Math.floor(mouseY / this.tileSize);
        return this.getTile(tileX, tileY);
    }
    mouseToTileCoords() {
    }
    draw() {
        window.state.ctx.fillStyle = "green";
        window.state.ctx.fillRect(0, 0, window.state.canvas.clientWidth, window.state.canvas.clientHeight);
        for (let x = 0; x < WORLD_SIZE; x++) {
            for (let y = 0; y < WORLD_SIZE; y++) {
                let tile = this.getTile(x, y);
                if (tile != null) {
                    tile.draw();
                }
            }
        }
    }
}
