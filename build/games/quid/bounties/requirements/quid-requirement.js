import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class QuidRequirement {
    constructor(container, args) {
        this.container = container;
        this.args = args;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }
    update() {
        // Own logic to track progress
    }
    isDone() {
        return false;
        // return this.haveAmount >= this.args.amount;
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1yZXF1aXJlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2JvdW50aWVzL3JlcXVpcmVtZW50cy9xdWlkLXJlcXVpcmVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlyRixNQUFNLE9BQU8sZUFBZTtJQUN4QixZQUNXLFNBQTRCLEVBQzVCLElBRU47UUFITSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUVWO0lBRUwsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sTUFBTTtRQUNULDhCQUE4QjtJQUNsQyxDQUFDO0lBRU0sTUFBTTtRQUNULE9BQU8sS0FBSyxDQUFDO1FBQ2IsOENBQThDO0lBQ2xELENBQUM7SUFFTSxTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9