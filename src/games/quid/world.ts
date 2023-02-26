import { Building, BuildingHighlight, Ore, RainbowOre } from "./gameObjects/buildings.js";
import { getMaterial } from "./gameObjects/material.js";

const WORLD_SIZE = 32;
const BASE_TILE_SIZE = 64;

export class World {
    layout: (Building | null)[][] = [];
    worldOffset: {x: number, y: number} = {x: 0, y: 0};
    zoomLevel = 1;
    buildingHighlight = new BuildingHighlight();
    mousedown = false;
    dragging = false;

    lastMousePos: {x: number, y: number} = {x: 0, y: 0};

    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D
    ) {
        this.generateWorld();

        this.buildingHighlight.setTexture("assets/selectOutline.png");

        canvas.oncontextmenu = (e => e.preventDefault());
        
        canvas.addEventListener("wheel", e => this.zoom(e.deltaY / 1000, e.clientX, e.clientY));

        canvas.addEventListener("mousedown", e => {
            this.mousedown = true;
            this.dragging = false;
        });

        canvas.addEventListener( "mousemove", e => {
            if (this.mousedown && e.buttons == 2) {
                this.dragging = true;
                this.worldOffset.x += (e.clientX - this.lastMousePos.x);
                this.worldOffset.y += (e.clientY - this.lastMousePos.y);
            }
            
            if (this.mousedown) this.buildingHighlight.disable();
            else this.hover(e.clientX, e.clientY);

            this.lastMousePos = {x: e.clientX, y: e.clientY};
        });

        canvas.addEventListener("mouseup", e => {
            this.mousedown = false;
            if (!this.dragging && e.button == 0) this.click(e.clientX, e.clientY);
            this.hover(e.clientX, e.clientY);
        });
    }

    zoom(amount: number, mouseX: number, mouseY: number) {
        this.zoomLevel = Math.min(Math.max(this.zoomLevel + amount, 0.2), 3);
        if (this.zoomLevel <= 0) this.zoomLevel = 0.00001;
        let coordinates = this.getTileCoordinates(mouseX, mouseY);
        this.updateHighlight(coordinates.x, coordinates.y);
    }

    getEffectiveTileSize() {
        return BASE_TILE_SIZE / this.zoomLevel;
    }

    generateWorld() {
        for (let x = 0; x < WORLD_SIZE; x++){
            this.layout[x] = [];
            for (let y = 0; y < WORLD_SIZE; y++){
                let generateOreChance = Math.random();
                if (generateOreChance > .98) {
                    this.layout[x][y] = new Ore(x, y, getMaterial("copper"));
                } else {
                    this.layout[x][y] = null;
                }
                
            }
        }
    }

    getTileCoordinates(x: number, y: number) {
        return {
            x: Math.floor((x / this.getEffectiveTileSize()) - (this.worldOffset.x / this.getEffectiveTileSize())), 
            y: Math.floor((y / this.getEffectiveTileSize()) - (this.worldOffset.y / this.getEffectiveTileSize()))
        }
    }

    click(x: number, y: number) {
        let coordinates = this.getTileCoordinates(x, y);
        this.setTile(coordinates.x, coordinates.y, RainbowOre);
    }

    hover(x: number, y: number) {
        let coordinates = this.getTileCoordinates(x, y);
        this.updateHighlight(coordinates.x, coordinates.y);
    }

    updateHighlight(x: number, y: number) {
        if (this.isInsideWorld(x, y)) this.buildingHighlight.move(x, y);
        else this.buildingHighlight.disable();
    }

    isInsideWorld(x: number, y: number) {
        return (x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE);
    }

    setTile(x: number, y: number, tile: any, ...args: any[]): boolean {
        if (!this.isInsideWorld(x, y)) {
            console.log("Clicked outside of world");
            return false;
        } else if (this.getTile(x, y) != null) {
            console.log("Already a building there");
            return false;
        }
        this.layout[x][y] = new tile(x, y, args);
        return true;
    }

    getTile(x: number, y: number) {
        return this.layout[x][y];
    }

    draw() {
        this.ctx.fillStyle = "#D2B48C";
        this.ctx.fillRect(this.worldOffset.x, this.worldOffset.y, WORLD_SIZE * this.getEffectiveTileSize(), WORLD_SIZE * this.getEffectiveTileSize());

        for (let x = 0; x < WORLD_SIZE; x++){
            for (let y = 0; y < WORLD_SIZE; y++){
                this.getTile(x, y)?.draw(this.ctx, this.worldOffset, this.getEffectiveTileSize());
            }
        }
        this.buildingHighlight.draw(this.ctx, this.worldOffset, this.getEffectiveTileSize());
    }
}