import { getDeltaTime } from "../../../common/deltaTime.js";
import { asyncTranslate, translateElement } from "../../../common/translation.js";

export class Timer {
    constructor(
        private element: HTMLElement,
        private timeLeft: number
    ) {

        this.translateElement();
    }
    update(): void {
        this.timeLeft = Math.max(this.timeLeft - getDeltaTime(), 0);
        this.translateElement();
    }
    checkTime(): boolean {
        return this.timeLeft <= 0;
    }
    translateElement(): void {
        translateElement(this.element, asyncTranslate("ui.timeLimit"), parseFloat(this.timeLeft.toFixed(2)));
    }
}