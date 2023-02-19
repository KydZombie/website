import { Sprite, SpriteData } from "./sprites/sprite.js";
export let buildings = new Map();
export class Building extends Sprite {
    constructor(name, xOrPos, y) {
        super(buildings.get(name), xOrPos, y);
    }
}
export class BuildingData extends SpriteData {
    constructor(name, texture) {
        super(name, texture);
        buildings.set(name, this);
    }
}
export function spawnBuilding(name, xOrPos, y) {
    return new Building(name, xOrPos, y);
}
export function createBuildings() {
    new BuildingData("ore", "metal/raw");
}
