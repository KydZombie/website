import * as data from "./data.js";
import * as vector from "../../common/vector.js";

const WORLD_SIZE = 50;
const DEFAULT_TILE_SIZE = 50;

class World {
    layout = new Array<Array<data.Building | null>>;
    
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

    setTile(set: string | data.BuildingData, xOrPos: vector.Pos | number, y: number) {
        if (set instanceof data.BuildingData) {
            set.spawn(xOrPos, y);
        }
        else {
            data.buildings[set].spawn(xOrPos, y);
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

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        for (let x = 0; x < WORLD_SIZE; x++) {
            for (let y = 0; y < WORLD_SIZE; y++) {
                let tile = this.getTile(x, y)
                if (tile != null) {
                    tile.draw(ctx);
                }
            }
        }
    }

    
}
