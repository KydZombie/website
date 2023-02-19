import { ClickRequirement } from "./requirements/click-requirement.js";
export class Bounty {
    constructor(element, name, requirements, rewards, punishments, linkTo) {
        this.element = element;
        this.name = name;
        this.requirements = requirements;
        this.rewards = rewards;
        this.punishments = punishments;
        this.linkTo = linkTo;
        this.accepted = false;
        this.isReady = false;
        this.failed = false;
        this.readyToDelete = false;
        this.element.addEventListener("click", () => this.click());
    }
    click() {
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
    update() {
        if (!this.accepted || this.failed || this.isReady)
            return;
        this.requirements.forEach((req) => req.update());
        if (this.requirements.every(req => req.isDone())) {
            this.isReady = true;
            this.element.classList.add("ready");
        }
    }
    accept() {
        this.element.classList.add("accepted");
        this.accepted = true;
    }
    complete() {
        this.finish();
        this.rewards.forEach(reward => {
            reward.giveReward();
        });
    }
    markFailed() {
        this.failed = true;
        this.element.classList.add("failed");
    }
    fail() {
        this.punishments.forEach(punishment => punishment.punish());
        this.finish();
    }
    finish() {
        this.readyToDelete = true;
        if (this.linkTo) {
            window.state.queueBounty(this.linkTo.category, this.linkTo.name);
        }
    }
    updateStatus() {
        if (this.isReady) {
            this.complete();
            return;
        }
        else if (this.failed) {
            this.fail();
            return;
        }
    }
    queuedForDeletion() {
        return this.readyToDelete;
    }
    destroyBounty() {
        this.element.remove();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYm91bnRpZXMvYm91bnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBSXZFLE1BQU0sT0FBTyxNQUFNO0lBS2YsWUFDYyxPQUFvQixFQUNwQixJQUFZLEVBQ1osWUFBMkIsRUFDM0IsT0FBaUIsRUFDakIsV0FBeUIsRUFDekIsTUFBbUI7UUFMbkIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWU7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUNqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFhO1FBVmpDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFTbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLEtBQUs7UUFDWCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsS0FBSyxNQUFNLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN6QyxJQUFJLFdBQVcsWUFBWSxnQkFBZ0IsRUFBRTtvQkFDekMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN2QjthQUNKO1NBQ0o7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFFMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRWpELElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRU0sTUFBTTtRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUVNLFlBQVk7UUFDZixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTztTQUNWO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLE9BQU87U0FDVjtJQUNMLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxhQUFhO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNKIn0=