export class Bounty {
    constructor(activeRequirements) {
        this.activeRequirements = activeRequirements;
    }
    terminate() {
        console.log("Bounty has been terminated, you sux");
        this.activeRequirements.forEach(req => req.terminate());
    }
    update() {
        this.activeRequirements.forEach((req) => this.update());
        if (this.activeRequirements.every(req => req.isDone)) {
            // WE ARE FINISHED !
        }
    }
}
