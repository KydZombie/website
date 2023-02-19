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
        console.log("Would have given " + this.args.amount);
    }
    update() { }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpZC1yZXdhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9hY3Rpb25zL3Jld2FyZHMvcXVpZC1yZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXJGLE1BQU0sT0FBTyxVQUFVO0lBQ25CLFlBQ1csU0FBNEIsRUFDNUIsSUFFTjtRQUhNLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBQzVCLFNBQUksR0FBSixJQUFJLENBRVY7SUFDRixDQUFDO0lBQ0osZ0JBQWdCLENBQUMsT0FBb0I7UUFDakMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNLEtBQVUsQ0FBQztJQUVWLFNBQVM7SUFFaEIsQ0FBQztDQUNKIn0=