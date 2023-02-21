import { asyncTranslate, translateElement } from "../../common/translation.js";
import { Building, Ore } from "./gameObjects/buildings.js";

export class ShopItem {
    private element: HTMLDivElement;
    constructor(
        protected name: string,
        protected description: string,
        protected imageSrc: string,
        protected building: any,
        protected args: any
    ) {
        this.element = this.setUpElement();
    }

    private setUpElement() {
        let shopItem = document.createElement("div");
        shopItem.classList.add("shopitem");

        let title = document.createElement("h1");
        translateElement(title, asyncTranslate(this.name));

        let icon = document.createElement("img");
        icon.src = this.imageSrc;

        let text = document.createElement("p");
        translateElement(text, asyncTranslate(this.description));

        shopItem.appendChild(title);
        shopItem.appendChild(icon);
        shopItem.appendChild(text);

        shopItem.onclick = (e => console.log("Would change to " + this.name));

        return shopItem;
    }

    getElement() {
        return this.element;
    }
}

export class Shop {
    element = document.getElementById("shopitemholder")!;
    items: ShopItem[] = [];

    constructor() {
        for(let i = 0; i < 8; i++) {
            this.addShopItem("building.ore", "buildingDescription.ore", "assets/item/metalRaw.png", Ore);
        }
    }

    addShopItem(name: string, description: string, imageSrc: string, building: any, ...args: any[]) {
        let newItem = new ShopItem(name, description, imageSrc, building, args);
        this.items.push(newItem);
        this.element.appendChild(newItem.getElement());
    }
}