import { GameObject, GameObjectData } from "./gameObject.js";
import * as state from "./state.js";

let buildingData = [];

class Building extends GameObject {
    constructor(name, x, y) {
        super(buildingData[name], x, y);
    }
}

class BuildingData extends GameObjectData {
    constructor(name, texture) {
        super(name, texture);

        buildingData[name] = this;
    }
}

export function spawnBuilding(name, x, y) {
    return new Building(name, x, y);
}

export function createBuildings() {
    new BuildingData("ore", "metal/raw");
}

