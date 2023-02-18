export class ItemRequirement {
    constructor(container, args) {
        this.container = container;
        this.args = args;
        this.haveAmount = 0;
    }
    update() {
        // Own logic to track progress
    }
    isDone() {
        return this.haveAmount >= this.args.amount;
    }
    terminate() {
    }
}
