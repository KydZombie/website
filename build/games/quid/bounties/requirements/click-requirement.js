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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stcmVxdWlyZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9ib3VudGllcy9yZXF1aXJlbWVudHMvY2xpY2stcmVxdWlyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSXJGLE1BQU0sT0FBTyxnQkFBZ0I7SUFFekIsWUFDVyxTQUE0QjtRQUE1QixjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUYvQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBSXhCLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxPQUFvQjtRQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxNQUFNO1FBQ1QsZUFBZTtJQUNuQixDQUFDO0lBRU0sU0FBUztJQUVoQixDQUFDO0NBQ0oifQ==