import * as vector from "../../common/vector.js";
import { Building, BuildingData, buildings } from "./buildings.js";

const WORLD_SIZE = 50;
const DEFAULT_TILE_SIZE = 50;

export class World {
    layout = new Array<Array<Building | null>>;
    
    worldSize = WORLD_SIZE;
    tileSize = DEFAULT_TILE_SIZE;
    offset = new vector.Pos(0, 0);

    constructor() {
        for (let x = 0; x < WORLD_SIZE; x++) {
            this.layout[x] = [];
            for (let y = 0; y < WORLD_SIZE; y++) {
                this.layout[x][y] = null;
            }
        }
    }

    setTile(set: string | BuildingData, xOrPos: vector.Pos | number, y: number) {
        if (set instanceof BuildingData) {
            set.spawn(xOrPos, y);
        } else {
            buildings.get(set)!.spawn(xOrPos, y);
        }
    }
    
    getTile(x: number, y: number) {
        return this.layout[x][y];
    }

    click(mouseX: number, mouseY: number) {
        let tileX = Math.floor(mouseX / this.tileSize);
        let tileY = Math.floor(mouseY / this.tileSize);
        this.setTile("ore", tileX, tileY);
    }
    
    getTileFromMouse(mouseX: number, mouseY: number) {
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
                let tile = this.getTile(x, y)
                if (tile != null) {
                    tile.draw();
                }
            }
        }
    }

    
}
