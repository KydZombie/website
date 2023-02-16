import * as jsonLoader from "../../common/json-loader.js";

let materials = [];

class Material {
    constructor(name, data) {
        this.name = name;
        Object.assign(this, data);

        materials[name] = this;
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