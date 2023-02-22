import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class UnlockBuildingReward {
    constructor(container, args) {
        this.container = container;
        this.args = args;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("ui.unlock"), asyncTranslate(`building.${this.args.unlockName}`));
    }
    giveReward() {
    }
    update() { }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrLWJ1aWxkaW5nLXJld2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2JvdW50aWVzL3Jld2FyZHMvdW5sb2NrLWJ1aWxkaW5nLXJld2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFJckYsTUFBTSxPQUFPLG9CQUFvQjtJQUM3QixZQUNXLFNBQTRCLEVBQzVCLElBRU47UUFITSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUVWO0lBQ0YsQ0FBQztJQUNKLGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVELFVBQVU7SUFFVixDQUFDO0lBRUQsTUFBTSxLQUFVLENBQUM7SUFFVixTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9