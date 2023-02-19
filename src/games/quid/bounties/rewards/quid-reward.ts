import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import { BountiesContainer } from "../bounties-container.js";
import { Reward } from "./reward.js";

export class QuidReward implements Reward {
    public constructor(
        public container: BountiesContainer,
        public args: {
            amount: number
        }
    ) {}
    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate("ui.quid"), this.args.amount);
    }

    giveReward(): void {
        window.state.addQuid(this.args.amount);
    }

    update(): void {}

    public terminate(): void {
        
    }
}