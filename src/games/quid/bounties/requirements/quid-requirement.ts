import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import { BountiesContainer } from "../bounties-container.js";
import { Requirement } from "./requirement.js";

export class QuidRequirement implements Requirement {
    public constructor(
        public container: BountiesContainer,
        public args: {
            amount: number
        }
    ) {
    }

    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }

    public update(): void {
        // Own logic to track progress
    }
    
    public isDone(): boolean {
        return false;
        // return this.haveAmount >= this.args.amount;
    }

    public terminate(): void {
        
    }
}