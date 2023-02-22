import * as jsonLoader from "../../../common/json-loader.js";

let materials = new Map<string, Material>();

interface MaterialData {
    variants?: string[];
    color: HSLData;
}

interface HSLData {
    hue: string,
    saturation: string,
    lightness: string
}

export class Material {
    name: string;
    color: HSLData;
    variants?: string[];
    constructor(name: string, data: MaterialData) {
        this.name = name;
        this.color = data.color;
        this.variants = data.variants;

        materials.set(name, this);
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

export function getMaterial(name: string) {
    return materials.get(name)!;
}