import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class QuidPunishment {
    constructor(container, args) {
        this.container = container;
        this.args = args;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }
    punish() {
        window.state.loseQuid(this.args.amount);
    }
    update() {
        // Own logic to track progress
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1wdW5pc2htZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYm91bnRpZXMvcHVuaXNobWVudHMvcXVpZC1wdW5pc2htZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlyRixNQUFNLE9BQU8sY0FBYztJQUN2QixZQUNXLFNBQTRCLEVBQzVCLElBRU47UUFITSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUVWO0lBQ0YsQ0FBQztJQUNKLGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLE1BQU07UUFDVCw4QkFBOEI7SUFDbEMsQ0FBQztJQUVNLFNBQVM7SUFFaEIsQ0FBQztDQUNKIn0=