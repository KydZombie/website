import { SpriteData } from "./sprite.js";

const DEFAULT_SIZE = 32;

export let items = new Map<string, ItemData>();

class ItemData extends SpriteData {
    size: number;
    constructor(name: string, textureId: string, size?: number) {
        super(name, textureId);

        if (size) {
            this.size = size;
        } else {
            this.size = DEFAULT_SIZE;
        }
        
        items.set(name, this);
    }
}

function registerItem(name: string, textureId: string) {
    new ItemData(name, textureId);
}

export function registerAllItems() {
    console.log("Finished registering items");
}

export function getItem(name: string) {
    return items.get(name);
}