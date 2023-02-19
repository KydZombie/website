import { ClickRequirement } from "./requirements/click-requirement.js";
export class Bounty {
    constructor(element, name, requirements, rewards, punishments) {
        this.element = element;
        this.name = name;
        this.requirements = requirements;
        this.rewards = rewards;
        this.punishments = punishments;
        this.accepted = false;
        this.isReady = false;
        this.failed = false;
        this.finished = false;
        this.readyToDelete = false;
        this.element.addEventListener("click", () => this.click());
    }
    click() {
        if (this.finished) {
            this.finish();
            return;
        }
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
        if (!this.accepted || this.finished || this.failed || this.isReady)
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
        this.finished = true;
        this.rewards.forEach(reward => {
            reward.giveReward();
        });
    }
    markFailed() {
        this.failed = true;
        this.element.classList.add("failed");
    }
    fail() {
        this.finished = true;
        this.punishments.forEach(punishment => punishment.punish());
    }
    finish() {
        this.readyToDelete = true;
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
        return this.finished;
    }
    destroyBounty() {
        this.element.remove();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYWN0aW9ucy9ib3VudHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFJdkUsTUFBTSxPQUFPLE1BQU07SUFNZixZQUNjLE9BQW9CLEVBQ3BCLElBQVksRUFDWixZQUEyQixFQUMzQixPQUFpQixFQUNqQixXQUF5QjtRQUp6QixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUFVO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBVnZDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVFsQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRVMsS0FBSztRQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pDLElBQUksV0FBVyxZQUFZLGdCQUFnQixFQUFFO29CQUN6QyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3ZCO2FBQ0o7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRTNFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVqRCxJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sVUFBVTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU0sWUFBWTtRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1Y7YUFFSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osT0FBTztTQUNWO0lBQ0wsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0oifQ==