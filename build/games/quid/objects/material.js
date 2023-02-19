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
class Material {
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
            });
        }
        console.log("Finished loading materials");
    });
}
registerMaterials();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9vYmplY3RzL21hdGVyaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUFFN0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFPNUMsTUFBTSxRQUFRO0lBSVYsWUFBWSxJQUFZLEVBQUUsSUFBa0I7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5QixTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQWdCLGlCQUFpQjs7UUFDbkMsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEQsS0FBSyxNQUFNLGNBQWMsSUFBSSxJQUFJLEVBQUU7WUFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDcEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3pCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FBQTtBQUVELGlCQUFpQixFQUFFLENBQUMifQ==