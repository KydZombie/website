import { asyncTranslate, translateElement } from "../../../../common/translation.js";
export class ClickRequirement {
    constructor(container) {
        this.container = container;
        this.clicked = false;
    }
    translateElement(element) {
        translateElement(element, asyncTranslate("requirement.click"));
    }
    click() {
        this.clicked = true;
    }
    isDone() {
        return this.clicked;
    }
    update() {
        // Requirements
    }
    terminate() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stcmVxdWlyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9hY3Rpb25zL3JlcXVpcmVtZW50cy9jbGljay1yZXF1aXJlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFJckYsTUFBTSxPQUFPLGdCQUFnQjtJQUV6QixZQUNXLFNBQTRCO1FBQTVCLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBRi9CLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFJeEIsQ0FBQztJQUNELGdCQUFnQixDQUFDLE9BQW9CO1FBQ2pDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU07UUFDVCxlQUFlO0lBQ25CLENBQUM7SUFFTSxTQUFTO0lBRWhCLENBQUM7Q0FDSiJ9