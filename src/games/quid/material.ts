import * as jsonLoader from "../../common/json-loader.js";
import * as items from "./items.js";

let materials = new Map<string, Material>();

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

        materials.set(name, this);
    }
    getItemName(type: string) {
        return this.name + "" + (type.charAt(0).toUpperCase() + type.slice(1));
    }
    getItem(type: string) {
        return items.getItem(this.getItemName(type));
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