import { BountyLink } from "./definitions.js";
import { Punishment } from "./punishments/punishment.js";
import { ClickRequirement } from "./requirements/click-requirement.js";
import { Requirement } from "./requirements/requirement.js";
import { Reward } from "./rewards/reward.js";

export class Bounty {
    accepted = false;
    isReady = false;
    failed = false;
    readyToDelete = false;
    public constructor(
        protected element: HTMLElement,
        protected name: string,
        protected requirements: Requirement[],
        protected rewards: Reward[],
        protected punishments: Punishment[],
        protected linkTo?: BountyLink
    ) {
        this.element.addEventListener("click", () => this.click());
    }

    protected click() {
        if (this.accepted) {
            this.updateStatus();

            for (const requirement of this.requirements) {
                if (requirement instanceof ClickRequirement) {
                    requirement.click();
                }
            }
        }
        else {
            this.accept();
        }
    }

    public update() {
        if (!this.accepted || this.failed || this.isReady) return;

        this.requirements.forEach((req) => req.update());

        if(this.requirements.every(req => req.isDone())){
            this.isReady = true;
            this.element.classList.add("ready");
        }
    }

    public accept() {
        this.element.classList.add("accepted"); 
        this.accepted = true;
    }

    public complete() {
        this.finish();
        this.rewards.forEach(reward => {
            reward.giveReward();
        });
    }

    public markFailed() {
        this.failed = true;
        this.element.classList.add("failed");
    }

    public fail() {
        this.punishments.forEach(punishment => punishment.punish());
        this.finish();
    }

    public finish() {
        this.readyToDelete = true;

        if (this.linkTo) {
            window.state.queueBounty(this.linkTo.category, this.linkTo.name);
        }
    }

    public updateStatus() {
        if (this.isReady) {
            this.complete();
            return;
        } else if (this.failed) {
            this.fail();
            return;
        }
    }

    public queuedForDeletion(): boolean {
        return this.readyToDelete;
    }

    public destroyBounty() {
        this.element.remove();
    }
}