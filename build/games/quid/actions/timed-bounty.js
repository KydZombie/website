import { Bounty } from "./bounty.js";
export class TimedBounty extends Bounty {
    constructor(element, name, requirements, rewards, punishments, timer) {
        super(element, name, requirements, rewards, punishments);
        this.timer = timer;
    }
    update() {
        super.update();
        if (!this.accepted || this.finished || this.failed || this.isReady)
            return;
        this.timer.update();
        if (this.timer.checkTime()) {
            this.markFailed();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWQtYm91bnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYWN0aW9ucy90aW1lZC1ib3VudHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU1yQyxNQUFNLE9BQU8sV0FBWSxTQUFRLE1BQU07SUFDbkMsWUFDSSxPQUFvQixFQUNwQixJQUFZLEVBQ1osWUFBMkIsRUFDM0IsT0FBaUIsRUFDakIsV0FBeUIsRUFDakIsS0FBWTtRQUVwQixLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRmpELFVBQUssR0FBTCxLQUFLLENBQU87SUFHeEIsQ0FBQztJQUNNLE1BQU07UUFDVCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRTNFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUVMLENBQUM7Q0FDSiJ9