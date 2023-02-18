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
import * as items from "./items.js";
let materials = new Map();
class Material {
    constructor(name, data) {
        this.name = name;
        this.color = data.color;
        this.variants = data.variants;
        materials.set(name, this);
    }
    getItemName(type) {
        return this.name + "" + (type.charAt(0).toUpperCase() + type.slice(1));
    }
    getItem(type) {
        return items.getItem(this.getItemName(type));
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
