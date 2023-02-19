var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsonLoader from "../../../common/json-loader.js";
let materials = new Map();
export class Material {
    constructor(name, data) {
        this.name = name;
        this.color = data.color;
        this.variants = data.variants;
        materials.set(name, this);
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
                console.log(name);
            });
        }
        console.log("Finished loading materials");
    });
}
export function getMaterial(name) {
    return materials.get(name);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9nYW1lT2JqZWN0cy9tYXRlcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBRTdELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO0FBTzVDLE1BQU0sT0FBTyxRQUFRO0lBSWpCLFlBQVksSUFBWSxFQUFFLElBQWtCO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFnQixpQkFBaUI7O1FBQ25DLElBQUksSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELEtBQUssTUFBTSxjQUFjLElBQUksSUFBSSxFQUFFO1lBQy9CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVk7SUFDcEMsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQ2hDLENBQUMifQ==