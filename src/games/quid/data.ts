import * as jsonLoader from "../../common/json-loader.js";
import {Sprite, SpriteData} from "./sprite.js"
import {Pos} from "../../common/vector.js";

// Buildings

class Buildings {
    [key: string]: BuildingData;
}

export let buildings = new Buildings();

export class Building extends Sprite {
    constructor(name: string, xOrPos: Pos | number, y: number) {
        super(buildings[name], xOrPos, y);
    }
}

export class BuildingData extends SpriteData {
    constructor(name: string, texture: string) {
        super(name, texture);

        buildings[name] = this;
    }
}

export function spawnBuilding(name: string, xOrPos: Pos | number, y: number) {
    return new Building(name, xOrPos, y);
}

export function createBuildings() {
    new BuildingData("ore", "metal/raw");
}

// Items

const DEFAULT_SIZE = 32;

class Items {
    [key: string]: ItemData;
}

export let items = new Items();

class ItemData extends SpriteData {
    size: number;
    constructor(name: string, textureId: string, size?: number) {
        super(name, textureId);

        if (size) {
            this.size = size;
        } else {
            this.size = DEFAULT_SIZE;
        }
        
        items[name] = this;
    }
    
}
// if (texture) {
//     this.texture = this.getTexture(texture);
// }

function registerItem(name: string, textureId: string) {
    new ItemData(name, textureId);
}

export function registerAllItems() {
    console.log("Finished registering items");
}

export function getItem(name: string) {
    return items[name];
}

// Materials

class MaterialList {
    [key: string]: Material;
}

let materials = new MaterialList();

interface MaterialData {
    variants?: string[];
    color: string;
}

class Material {
    name: string;
    color: string;
    variants?: string[];
    constructor(name: string, data: MaterialData) {
        this.name = name;
        this.color = data.color;
        this.variants = data.variants;
        

        if (this.variants) {
            console.log(this.variants);
        }

        materials[name] = this;
    }
    getItemName(type: string) {
        return this.name + "" + (type.charAt(0).toUpperCase() + type.slice(1));
    }
    getItem(type: string) {
        return getItem(this.getItemName(type));
    }
}

export async function registerMaterials() {
    let json = await jsonLoader.getJson("materials.json");
    for (const materialSetKey in json) {
        let materialSet = json[materialSetKey];
        let variants = materialSet.variants;
        let types = materialSet.materials;
        Object.keys(types).forEach(name => {
            let data = materialSet.materials[name];
            data.variants = variants;
            new Material(name, data);
        });
    }
    console.log("Finished loading materials");
}

registerMaterials();