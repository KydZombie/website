import * as jsonLoader from "../../common/json-loader.js";
import * as textureManager from "../../common/textureManager.js";
import * as state from "./items.js";

let materials = [];

class Material {
    constructor(name, data) {
        this.name = name;
        Object.assign(this, data);

        if (this.variants) {
            console.log(this.variants);
        }

        materials[name] = this;
        this.getItem("bar");
    }
    getItemName(type) {
        return this.name + "" + (type.charAt(0).toUpperCase() + type.slice(1));
    }
    getItem(type) {
        return state.items.getItem(this.getItemName(type));
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