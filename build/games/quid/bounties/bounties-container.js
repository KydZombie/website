var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cursor from "../../../common/cursor.js";
import { asyncTranslate, translateElement } from "../../../common/translation.js";
import { Bounty } from "./bounty.js";
import { TimedBounty } from "./timed-bounty.js";
import { Timer } from "./timer.js";
const MAX_BOUNTIES = 4;
export class BountiesContainer {
    static load(url, panelElement) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            const map = yield response.json();
            return new BountiesContainer(panelElement, map);
        });
    }
    constructor(rootElement, bountiesDefinition) {
        this.rootElement = rootElement;
        this.bountiesDefinition = bountiesDefinition;
        this.requirementTypes = new Map();
        this.rewardTypes = new Map();
        this.punishmentTypes = new Map();
        this.activeBounties = [];
        this.bountyQueue = [];
    }
    getBountyDefinition(category, name) {
        return this.bountiesDefinition[category][name];
    }
    useRequirement(name, type) {
        this.requirementTypes.set(name, type);
    }
    getRequirementType(name) {
        return this.requirementTypes.get(name);
    }
    useReward(name, type) {
        this.rewardTypes.set(name, type);
    }
    getRewardType(name) {
        return this.rewardTypes.get(name);
    }
    usePunishment(name, type) {
        this.punishmentTypes.set(name, type);
    }
    getPunishmentType(name) {
        return this.punishmentTypes.get(name);
    }
    loadBounty(category, name) {
        const bountyDefinition = this.getBountyDefinition(category, name);
        let bountyElement = document.createElement("div");
        bountyElement.classList.add("bounty");
        bountyElement.dataset.bounty = name;
        let titleElement = document.createElement("h1");
        translateElement(titleElement, asyncTranslate(`bounty.${category}.${name}`));
        bountyElement.appendChild(titleElement);
        let requirementsElement = document.createElement("p");
        translateElement(requirementsElement, asyncTranslate("ui.requirement"));
        bountyElement.appendChild(requirementsElement);
        const requirementsInstances = [];
        bountyDefinition.requirements.forEach(requirement => {
            const reqType = this.requirementTypes.get(requirement.name);
            if (!reqType)
                throw new Error("Requirement with name " + requirement.name + " not found, did you forgot to add it with `useRequirement` ?");
            let req = new reqType(this, requirement.args);
            let element = document.createElement("p");
            element.classList.add("indented");
            req.translateElement(element);
            bountyElement.appendChild(element);
            requirementsInstances.push(req);
        });
        let rewardsElement = document.createElement("p");
        translateElement(rewardsElement, asyncTranslate("ui.reward"));
        bountyElement.appendChild(rewardsElement);
        const rewardsInstances = [];
        bountyDefinition.rewards.forEach(reward => {
            const rewardType = this.rewardTypes.get(reward.name);
            if (!rewardType)
                throw new Error("Reward with name " + reward.name + " not found, did you forgot to add it with `useReward` ?");
            let rewardObject = new rewardType(this, reward.args);
            let element = document.createElement("p");
            element.classList.add("indented");
            rewardObject.translateElement(element);
            bountyElement.appendChild(element);
            rewardsInstances.push(rewardObject);
        });
        const punishmentInstances = [];
        if (bountyDefinition.punishments) {
            let punishmentElement = document.createElement("p");
            translateElement(punishmentElement, asyncTranslate("ui.punishment"));
            bountyElement.appendChild(punishmentElement);
            bountyDefinition.punishments.forEach(punishment => {
                const punishmentType = this.punishmentTypes.get(punishment.name);
                if (!punishmentType)
                    throw new Error("Punishment with name " + punishment.name + " not found, did you forgot to add it with `usePunishment` ?");
                let punishmentObject = new punishmentType(this, punishment.args);
                let element = document.createElement("p");
                element.classList.add("indented");
                punishmentObject.translateElement(element);
                bountyElement.appendChild(element);
                punishmentInstances.push(punishmentObject);
            });
        }
        let linkTo = bountyDefinition.linkTo;
        if (bountyDefinition.timeLimit) {
            let timerElement = document.createElement("p");
            bountyElement.appendChild(timerElement);
            let timer = new Timer(timerElement, bountyDefinition.timeLimit);
            this.rootElement.appendChild(bountyElement);
            cursor.addHovering(bountyElement);
            this.activeBounties.push(new TimedBounty(bountyElement, name, requirementsInstances, rewardsInstances, punishmentInstances, linkTo, timer));
        }
        else {
            this.rootElement.appendChild(bountyElement);
            cursor.addHovering(bountyElement);
            this.activeBounties.push(new Bounty(bountyElement, name, requirementsInstances, rewardsInstances, punishmentInstances, linkTo));
        }
    }
    queueBounty(category, name) {
        this.bountyQueue.push({ category: category, name: name });
    }
    loadQueued() {
        for (let i = this.bountyQueue.length - 1; i >= 0; i--) {
            if (this.activeBounties.length >= MAX_BOUNTIES)
                return;
            let newBounty = this.bountyQueue.pop();
            this.loadBounty(newBounty.category, newBounty.name);
        }
    }
    update() {
        for (let i = this.activeBounties.length - 1; i >= 0; i--) {
            let bounty = this.activeBounties[i];
            bounty.update();
            if (!bounty.queuedForDeletion())
                continue;
            bounty.destroyBounty();
            this.activeBounties.splice(i);
        }
        this.loadQueued();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bnRpZXMtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYm91bnRpZXMvYm91bnRpZXMtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLE1BQU0sT0FBTyxpQkFBaUI7SUFPbkIsTUFBTSxDQUFPLElBQUksQ0FBQyxHQUFXLEVBQUUsWUFBeUI7O1lBQzNELElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWxDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUQsWUFDWSxXQUF3QixFQUN0QixrQkFBdUI7UUFEekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFLO1FBZjdCLHFCQUFnQixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNELGdCQUFXLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakQsb0JBQWUsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUM5QixnQkFBVyxHQUF1QyxFQUFF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