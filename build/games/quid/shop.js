import { asyncTranslate, translateElement } from "../../common/translation.js";
import { Ore } from "./gameObjects/buildings.js";
export class ShopItem {
    constructor(name, description, imageSrc, building, args) {
        this.name = name;
        this.description = description;
        this.imageSrc = imageSrc;
        this.building = building;
        this.args = args;
        this.element = this.setUpElement();
    }
    setUpElement() {
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
    constructor() {
        this.element = document.getElementById("shopitemholder");
        this.items = [];
        for (let i = 0; i < 8; i++) {
            this.addShopItem("building.ore", "buildingDescription.ore", "assets/item/metalRaw.png", Ore);
        }
    }
    addShopItem(name, description, imageSrc, building, ...args) {
        let newItem = new ShopItem(name, description, imageSrc, building, args);
        this.items.push(newItem);
        this.element.appendChild(newItem.getElement());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL3Nob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9FLE9BQU8sRUFBWSxHQUFHLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxNQUFNLE9BQU8sUUFBUTtJQUVqQixZQUNjLElBQVksRUFDWixXQUFtQixFQUNuQixRQUFnQixFQUNoQixRQUFhLEVBQ2IsSUFBUztRQUpULFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDYixTQUFJLEdBQUosSUFBSSxDQUFLO1FBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUV6RCxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXRFLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxJQUFJO0lBSWI7UUFIQSxZQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDO1FBQ3JELFVBQUssR0FBZSxFQUFFLENBQUM7UUFHbkIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNoRztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBWSxFQUFFLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxRQUFhLEVBQUUsR0FBRyxJQUFXO1FBQzFGLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0oifQ==