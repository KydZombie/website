export class ClickRequirement {
    constructor(container) {
        this.container = container;
        this.clicked = false;
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
