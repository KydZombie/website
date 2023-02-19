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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrLXJld2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2JvdW50aWVzL3Jld2FyZHMvdW5sb2NrLXJld2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFJckYsTUFBTSxPQUFPLG1CQUFtQjtJQUM1QixZQUNXLFNBQTRCLEVBQzVCLElBRU47UUFITSxjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixTQUFJLEdBQUosSUFBSSxDQUVWO0lBQ0YsQ0FBQztJQUNKLGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVELFVBQVU7SUFFVixDQUFDO0lBRUQsTUFBTSxLQUFVLENBQUM7SUFFVixTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9