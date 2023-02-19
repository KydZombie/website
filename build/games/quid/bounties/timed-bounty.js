import { Bounty } from "./bounty.js";
export class TimedBounty extends Bounty {
    constructor(element, name, requirements, rewards, punishments, linkTo, timer) {
        super(element, name, requirements, rewards, punishments, linkTo);
        this.timer = timer;
    }
    update() {
        super.update();
        if (!this.accepted || this.failed || this.isReady)
            return;
        this.timer.update();
        if (this.timer.checkTime()) {
            this.markFailed();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWQtYm91bnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYm91bnRpZXMvdGltZWQtYm91bnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPckMsTUFBTSxPQUFPLFdBQVksU0FBUSxNQUFNO0lBQ25DLFlBQ0ksT0FBb0IsRUFDcEIsSUFBWSxFQUNaLFlBQTJCLEVBQzNCLE9BQWlCLEVBQ2pCLFdBQXlCLEVBQ3pCLE1BQThCLEVBQ3RCLEtBQVk7UUFFcEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFGekQsVUFBSyxHQUFMLEtBQUssQ0FBTztJQUd4QixDQUFDO0lBQ00sTUFBTTtRQUNULEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRTFELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUVMLENBQUM7Q0FDSiJ9