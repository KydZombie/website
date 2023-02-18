var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsonLoader from "../../common/json-loader.js";
import { Sprite, SpriteData } from "./sprite.js";
// Buildings
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
// Items
const DEFAULT_SIZE = 32;
export let items = new Map();
class ItemData extends SpriteData {
    constructor(name, textureId, size) {
        super(name, textureId);
        if (size) {
            this.size = size;
        }
        else {
            this.size = DEFAULT_SIZE;
        }
        items.set(name, this);
    }
}
// if (texture) {
//     this.texture = this.getTexture(texture);
// }
function registerItem(name, textureId) {
    new ItemData(name, textureId);
}
export function registerAllItems() {
    console.log("Finished registering items");
}
export function getItem(name) {
    return items.get(name);
}
// Materials
class MaterialList {
}
let materials = new MaterialList();
class Material {
    constructor(name, data) {
        this.name = name;
        this.color = data.color;
        this.variants = data.variants;
        if (this.variants) {
            console.log(this.variants);
        }
        materials[name] = this;
    }
    getItemName(type) {
        return this.name + "" + (type.charAt(0).toUpperCase() + type.slice(1));
    }
    getItem(type) {
        return getItem(this.getItemName(type));
    }
}
export function registerMaterials() {
    return __awaiter(this, void 0, void 0, function* () {
        let json = yield jsonLoader.getJson("materials.json");
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
    });
}
registerMaterials();
