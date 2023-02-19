export class Shop {
    element = document.getElementById("shopitemholder")!;
    items: HTMLDivElement[] = [];

    constructor() {
        for(let i = 0; i < 10; i++) {
            let shopItem = document.createElement("div");
            shopItem.classList.add("shopitem");
            this.element.appendChild(shopItem);
            this.items.push(shopItem);
        }
    }
}