import { getDeltaTime } from "../../../common/deltaTime.js";
import { asyncTranslate, translateElement } from "../../../common/translation.js";
export class Timer {
    constructor(element, timeLeft) {
        this.element = element;
        this.timeLeft = timeLeft;
        this.translateElement();
    }
    update() {
        this.timeLeft = Math.max(this.timeLeft - getDeltaTime(), 0);
        this.translateElement();
    }
    checkTime() {
        return this.timeLeft <= 0;
    }
    translateElement() {
        translateElement(this.element, asyncTranslate("ui.timeLimit"), parseFloat(this.timeLeft.toFixed(2)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9ib3VudGllcy90aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRWxGLE1BQU0sT0FBTyxLQUFLO0lBQ2QsWUFDWSxPQUFvQixFQUNwQixRQUFnQjtRQURoQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFHeEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0QsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELGdCQUFnQjtRQUNaLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztDQUNKIn0=