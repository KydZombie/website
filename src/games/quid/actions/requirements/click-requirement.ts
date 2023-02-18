import { BountiesContainer } from "../bounties-container";
import { Requirement } from "./requirement";

export class ClickRequirement implements Requirement {
    private clicked = false;
    public constructor(
        public container: BountiesContainer
    ) {}

    isDone(): boolean {
        return this.clicked;
    }

    public update(): void {
        // Requirements
    }

    public terminate(): void {
        
    }
}