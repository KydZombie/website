import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import { BountiesContainer } from "../bounties-container.js";
import { Reward } from "./reward.js";

export class UnlockBuildingReward implements Reward {
    public constructor(
        public container: BountiesContainer,
        public args: {
            unlockName: string
        }
    ) {}
    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate("ui.unlock"), asyncTranslate(`building.${this.args.unlockName}`));
    }
    
    giveReward(): void {
        
    }

    update(): void {}

    public terminate(): void {
        
    }
}