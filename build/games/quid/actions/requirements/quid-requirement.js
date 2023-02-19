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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1yZXF1aXJlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYW1lcy9xdWlkL2FjdGlvbnMvcmVxdWlyZW1lbnRzL3F1aWQtcmVxdWlyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXJGLE1BQU0sT0FBTyxlQUFlO0lBQ3hCLFlBQ1csU0FBNEIsRUFDNUIsSUFFTjtRQUhNLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBQzVCLFNBQUksR0FBSixJQUFJLENBRVY7SUFFTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBb0I7UUFDakMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxNQUFNO1FBQ1QsOEJBQThCO0lBQ2xDLENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxLQUFLLENBQUM7UUFDYiw4Q0FBOEM7SUFDbEQsQ0FBQztJQUVNLFNBQVM7SUFFaEIsQ0FBQztDQUNKIn0=