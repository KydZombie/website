import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import { BountiesContainer } from "../bounties-container.js";
import { Requirement } from "./requirement.js";

export class ItemRequirement implements Requirement {
    public haveAmount: number = 0;

    public constructor(
        public container: BountiesContainer,
        public args: {
            itemName: string,
            amount: number
        }
    ) {
        this.updateText();
    }

    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate(`item.${this.args.itemName}`), ": ", this.args.amount);
    }

    updateText(): void {
        
    }

    public update(): void {
        // Own logic to track progress
    }
    
    public isDone(): boolean {
        return this.haveAmount >= this.args.amount;
    }

    public terminate(): void {
        
    }
}