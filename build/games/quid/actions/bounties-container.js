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
        let punishmentElement = document.createElement("p");
        translateElement(punishmentElement, asyncTranslate("ui.punishment"));
        bountyElement.appendChild(punishmentElement);
        const punishmentInstances = [];
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
        if (bountyDefinition.timeLimit) {
            let timerElement = document.createElement("p");
            bountyElement.appendChild(timerElement);
            let timer = new Timer(timerElement, bountyDefinition.timeLimit);
            this.rootElement.appendChild(bountyElement);
            cursor.addHovering(bountyElement);
            this.activeBounties.push(new TimedBounty(bountyElement, name, requirementsInstances, rewardsInstances, punishmentInstances, timer));
        }
        else {
            this.rootElement.appendChild(bountyElement);
            cursor.addHovering(bountyElement);
            this.activeBounties.push(new Bounty(bountyElement, name, requirementsInstances, rewardsInstances, punishmentInstances));
        }
    }
    update() {
        for (let i = this.activeBounties.length - 1; i >= 0; i--) {
            let bounty = this.activeBounties[i];
            bounty.update();
            if (!bounty.queuedForDeletion())
                continue;
            bounty.destroyBounty();
            this.activeBounties.slice;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bnRpZXMtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvYWN0aW9ucy9ib3VudGllcy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUtyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVuQyxNQUFNLE9BQU8saUJBQWlCO0lBTW5CLE1BQU0sQ0FBTyxJQUFJLENBQUMsR0FBVyxFQUFFLFlBQXlCOztZQUMzRCxJQUFJLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVsQyxPQUFPLElBQUksaUJBQWlCLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVELFlBQ1ksV0FBd0IsRUFDdEIsa0JBQXVCO1FBRHpCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBSztRQWQ3QixxQkFBZ0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMzRCxnQkFBVyxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pELG9CQUFlLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckQsbUJBQWMsR0FBYSxFQUFFLENBQUM7SUFhdEMsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsSUFBWTtRQUN0RCxPQUFP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