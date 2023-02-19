export class Shop {
    element = document.getElementById("shopitemholder")!;
    items: HTMLDivElement[] = [];

    constructor() {
        for(let i = 0; i < 8; i++) {
            let shopItem = document.createElement("div");
            shopItem.classList.add("shopitem");

            let title = document.createElement("h1");
            title.innerHTML = "Example Thing";

            let icon = document.createElement("img");
            icon.src = "assets/item/metalRaw.png";

            let text = document.createElement("p");
            text.innerHTML = "This is a description";

            shopItem.appendChild(title);
            shopItem.appendChild(icon);
            shopItem.appendChild(text);
            
            

            this.element.appendChild(shopItem);
            this.items.push(shopItem);
        }
    }
}