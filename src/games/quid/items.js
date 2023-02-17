import * as state from "./state.js";
import { GameObjectData } from "./gameObject.js";

const DEFAULT_SIZE = 32;

let itemData = [];

class Item extends GameObjectData {
    constructor(name, texture, size) {
        if (size) {
            this.size = size;
        } else {
            this.size = DEFAULT_SIZE;
        }

        super(name, texture);

        itemData[name] = this;
    }
    
}
// if (texture) {
//     this.texture = this.getTexture(texture);
// }

function registerItem(name, data) {
    new Item(name, data);
}

export function registerAllItems() {
    console.log("Finished registering items");
}

export function getItem(name) {
    return itemData[name];
}