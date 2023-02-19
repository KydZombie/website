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
        console.log("Would punish for " + this.args.amount);
    }
    update() {
        // Own logic to track progress
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1wdW5pc2htZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYWN0aW9ucy9wdW5pc2htZW50cy9xdWlkLXB1bmlzaG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXJGLE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLFlBQ1csU0FBNEIsRUFDNUIsSUFFTjtRQUhNLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBQzVCLFNBQUksR0FBSixJQUFJLENBRVY7SUFDRixDQUFDO0lBQ0osZ0JBQWdCLENBQUMsT0FBb0I7UUFDakMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxNQUFNO1FBQ1QsOEJBQThCO0lBQ2xDLENBQUM7SUFFTSxTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9