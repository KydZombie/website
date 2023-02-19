import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class QuidReward {
    constructor(container, args) {
        this.container = container;
        this.args = args;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }
    giveReward() {
        window.state.addQuid(this.args.amount);
    }
    update() { }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1yZXdhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9ib3VudGllcy9yZXdhcmRzL3F1aWQtcmV3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlyRixNQUFNLE9BQU8sVUFBVTtJQUNuQixZQUNXLFNBQTRCLEVBQzVCLElBRU47UUFITSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUVWO0lBQ0YsQ0FBQztJQUNKLGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsVUFBVTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE1BQU0sS0FBVSxDQUFDO0lBRVYsU0FBUztJQUVoQixDQUFDO0NBQ0oifQ==