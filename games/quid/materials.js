import * as jsonLoader from "../../common/json-loader.js";

let materials = {};

export async function registerMaterials() {
    let json = await jsonLoader.getJson("materials.json");
    for (const materialSet in json) {
        if (Object.hasOwnProperty.call(json, materialSet)) {
            let variants = materialSet.variants;
        }
    }
}

