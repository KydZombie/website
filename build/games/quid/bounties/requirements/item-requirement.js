import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class ItemRequirement {
    constructor(container, args) {
        this.container = container;
        this.args = args;
        this.haveAmount = 0;
        this.updateText();
    }
    translateElement(element) {
        translateElement(element, asyncTranslate(`item.${this.args.itemName}`), ": ", this.args.amount);
    }
    updateText() {
    }
    update() {
        // Own logic to track progress
    }
    isDone() {
        return this.haveAmount >= this.args.amount;
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1yZXF1aXJlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2JvdW50aWVzL3JlcXVpcmVtZW50cy9pdGVtLXJlcXVpcmVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlyRixNQUFNLE9BQU8sZUFBZTtJQUd4QixZQUNXLFNBQTRCLEVBQzVCLElBR047UUFKTSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUdWO1FBUEUsZUFBVSxHQUFXLENBQUMsQ0FBQztRQVMxQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVELFVBQVU7SUFFVixDQUFDO0lBRU0sTUFBTTtRQUNULDhCQUE4QjtJQUNsQyxDQUFDO0lBRU0sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQyxDQUFDO0lBRU0sU0FBUztJQUVoQixDQUFDO0NBQ0oifQ==