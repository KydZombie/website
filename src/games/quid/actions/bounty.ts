import { Requirement } from "./requirements/requirement";

export class Bounty {
    public constructor(
        private activeRequirements: Requirement[]
    ) {
    }

    public terminate(): void {
        console.log("Bounty has been terminated, you sux");
        this.activeRequirements.forEach(req => req.terminate());
    }

    public update(): void {
        this.activeRequirements.forEach((req) => this.update());

        if(this.activeRequirements.every(req => req.isDone))
        {
            // WE ARE FINISHED !
        }
    }
}