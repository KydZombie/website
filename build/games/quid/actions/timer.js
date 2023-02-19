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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9hY3Rpb25zL3RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbEYsTUFBTSxPQUFPLEtBQUs7SUFDZCxZQUNZLE9BQW9CLEVBQ3BCLFFBQWdCO1FBRGhCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUd4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0NBQ0oifQ==