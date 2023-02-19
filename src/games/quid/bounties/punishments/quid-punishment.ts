import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import { BountiesContainer } from "../bounties-container.js";
import { Punishment } from "./punishment.js";

export class QuidPunishment implements Punishment {
    public constructor(
        public container: BountiesContainer,
        public args: {
            amount: number
        }
    ) {}
    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }

    punish(): void {
        window.state.loseQuid(this.args.amount);
    }

    public update(): void {
        // Own logic to track progress
    }

    public terminate(): void {
        
    }
}