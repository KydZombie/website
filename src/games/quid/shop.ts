import { asyncTranslate, translateElement } from "../../common/translation.js";
import { Building, Ore, RainbowOre } from "./gameObjects/buildings.js";
import { getMaterial } from "./gameObjects/material.js";

export class ShopItem {
    private element: HTMLDivElement;
    
    constructor(
        protected name: string,
        protected description: string,
        protected imageSrc: string,
        protected building: Building,
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

        shopItem.onclick = (() => this.click());

        return shopItem;
    }
    
    private click() {
        window.state.setSelectedBuilding(this.building, this.args);
    }

    getElement() {
        return this.element;
    }
}

export class Shop {
    element = document.getElementById("shopitemholder")!;
    items: ShopItem[] = [];

    constructor() {
        this.addShopItem("building.rainbowOre", "buildingDescription.rainbowOre", "assets/item/metalRaw.png", RainbowOre);
        this.addShopItem("building.ore", "buildingDescription.ore", "assets/item/metalRaw.png", Ore, { material: getMaterial("copper")});
    }

    addShopItem(name: string, description: string, imageSrc: string, building: any, args?: any) {
        let newItem = new ShopItem(name, description, imageSrc, building, args);
        this.items.push(newItem);
        this.element.appendChild(newItem.getElement());
    }
}