import { Pos } from "../../common/vector.js";
import { Sprite, SpriteData } from "./sprite.js";

export let buildings = new Map<string, BuildingData>();

export class Building extends Sprite {
    constructor(name: string, xOrPos: Pos | number, y: number) {
        super(buildings.get(name)!, xOrPos, y);
    }
}

export class BuildingData extends SpriteData {
    constructor(name: string, texture: string) {
        super(name, texture);

        buildings.set(name, this);
    }
}

export function spawnBuilding(name: string, xOrPos: Pos | number, y: number) {
    return new Building(name, xOrPos, y);
}

export function createBuildings() {
    new BuildingData("ore", "metal/raw");
}