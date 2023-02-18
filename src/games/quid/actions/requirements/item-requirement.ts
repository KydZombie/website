import { BountiesContainer } from "../bounties-container.js";
import { Requirement } from "./requirement";

export class ItemRequirement implements Requirement {
    public haveAmount: number = 0;

    public constructor(
        public container: BountiesContainer,
        public args: {
            itemName: string,
            amount: number
        }
    ) {}

    public update(): void {
        // Own logic to track progress
    }
    
    public isDone(): boolean {
        return this.haveAmount >= this.args.amount;
    }

    public terminate(): void {
        
    }
}