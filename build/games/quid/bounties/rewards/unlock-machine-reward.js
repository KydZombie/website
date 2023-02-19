import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class UnlockMachineReward {
    constructor(container, args) {
        this.container = container;
        this.args = args;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("ui.unlock"), asyncTranslate(`machine.${this.args.unlockName}`));
    }
    giveReward() {
    }
    update() { }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrLW1hY2hpbmUtcmV3YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYm91bnRpZXMvcmV3YXJkcy91bmxvY2stbWFjaGluZS1yZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXJGLE1BQU0sT0FBTyxtQkFBbUI7SUFDNUIsWUFDVyxTQUE0QixFQUM1QixJQUVOO1FBSE0sY0FBUyxHQUFULFNBQVMsQ0FBbUI7UUFDNUIsU0FBSSxHQUFKLElBQUksQ0FFVjtJQUNGLENBQUM7SUFDSixnQkFBZ0IsQ0FBQyxPQUFvQjtRQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFRCxVQUFVO0lBRVYsQ0FBQztJQUVELE1BQU0sS0FBVSxDQUFDO0lBRVYsU0FBUztJQUVoQixDQUFDO0NBQ0oifQ==