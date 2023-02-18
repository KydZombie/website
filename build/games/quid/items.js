import { SpriteData } from "./sprite.js";
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
function registerItem(name, textureId) {
    new ItemData(name, textureId);
}
export function registerAllItems() {
    console.log("Finished registering items");
}
export function getItem(name) {
    return items.get(name);
}
