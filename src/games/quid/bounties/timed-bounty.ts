import { Bounty } from "./bounty.js";
import { BountyLink } from "./definitions.js";
import { Punishment } from "./punishments/punishment.js";
import { Requirement } from "./requirements/requirement.js";
import { Reward } from "./rewards/reward.js";
import { Timer } from "./timer.js";

export class TimedBounty extends Bounty {
    public constructor(
        element: HTMLElement,
        name: string,
        requirements: Requirement[],
        rewards: Reward[],
        punishments: Punishment[],
        linkTo: BountyLink | undefined,
        private timer: Timer
    ) {
        super(element, name, requirements, rewards, punishments, linkTo);
    }
    public update() {
        super.update();
        if (!this.accepted || this.failed || this.isReady) return;

        this.timer.update();

        if (this.timer.checkTime()) {
            this.markFailed();
        }
        
    }
}