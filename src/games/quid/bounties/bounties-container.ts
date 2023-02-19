import * as cursor from "../../../common/cursor.js";
import { asyncTranslate, translateElement } from "../../../common/translation.js";
import { BountyItem } from "./bounty-item.js";
import { Bounty } from "./bounty.js";
import { BountyDefinition, PunishmentType, RequirementType, RewardType } from "./definitions";
import { Punishment } from "./punishments/punishment.js";
import { Requirement } from "./requirements/requirement.js";
import { Reward } from "./rewards/reward.js";
import { TimedBounty } from "./timed-bounty.js";
import { Timer } from "./timer.js";

const MAX_BOUNTIES = 4;

export class BountiesContainer {
    private requirementTypes: Map<string, RequirementType> = new Map();
    private rewardTypes: Map<string, RewardType> = new Map();
    private punishmentTypes: Map<string, RewardType> = new Map();
    private activeBounties: Bounty[] = [];
    private bountyQueue: {category: string, name: string}[] = [];

    public static async load(url: string, panelElement: HTMLElement): Promise<BountiesContainer> {
        let response = await fetch(url);
        const map = await response.json();
        
        return new BountiesContainer(panelElement, map);
    }

    private constructor(
        private rootElement: HTMLElement,
        protected bountiesDefinition: any
    ) {
    }

    private getBountyDefinition(category: string, name: string): BountyDefinition {
        return this.bountiesDefinition[category][name];
    }

    public useRequirement<T extends { new (container: BountiesContainer, args?: any): InstanceType<T> }>(name: string, type: T): void {
        this.requirementTypes.set(name, type);
    }

    public getRequirementType(name: string): RequirementType | undefined {
        return this.requirementTypes.get(name);
    }

    public useReward<T extends { new (container: BountiesContainer, args?: any): InstanceType<T> }>(name: string, type: T): void {
        this.rewardTypes.set(name, type);
    }

    public getRewardType(name: string): RewardType | undefined {
        return this.rewardTypes.get(name);
    }

    public usePunishment<T extends { new (container: BountiesContainer, args?: any): InstanceType<T> }>(name: string, type: T): void {
        this.punishmentTypes.set(name, type);
    }

    public getPunishmentType(name: string): PunishmentType | undefined {
        return this.punishmentTypes.get(name);
    }

    private loadBounty(category: string, name: string): void {
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

        const requirementsInstances: Requirement[] = [];
        
        bountyDefinition.requirements.forEach(requirement => {
            const reqType = this.requirementTypes.get(requirement.name);
            if(!reqType) throw new Error("Requirement with name " + requirement.name + " not found, did you forgot to add it with `useRequirement` ?");

            let req: Requirement = new reqType(this, requirement.args);

            let element = document.createElement("p");
            element.classList.add("indented");
            req.translateElement(element);
            bountyElement.appendChild(element);

            requirementsInstances.push(req);
        });

        let rewardsElement = document.createElement("p");
        translateElement(rewardsElement, asyncTranslate("ui.reward"));
        bountyElement.appendChild(rewardsElement);

        const rewardsInstances: Reward[] = [];
        
        bountyDefinition.rewards.forEach(reward => {
            const rewardType = this.rewardTypes.get(reward.name);
            if(!rewardType) throw new Error("Reward with name " + reward.name + " not found, did you forgot to add it with `useReward` ?");

            let rewardObject: Reward = new rewardType(this, reward.args);

            let element = document.createElement("p");
            element.classList.add("indented");
            rewardObject.translateElement(element);
            bountyElement.appendChild(element);

            rewardsInstances.push(rewardObject);
        });

        const punishmentInstances: Punishment[] = [];

        if (bountyDefinition.punishments) {
            let punishmentElement = document.createElement("p");
            translateElement(punishmentElement, asyncTranslate("ui.punishment"));
            bountyElement.appendChild(punishmentElement);
            
            bountyDefinition.punishments.forEach(punishment => {
                const punishmentType = this.punishmentTypes.get(punishment.name);
                if(!punishmentType) throw new Error("Punishment with name " + punishment.name + " not found, did you forgot to add it with `usePunishment` ?");
    
                let punishmentObject: Punishment = new punishmentType(this, punishment.args);
    
                let element = document.createElement("p");
                element.classList.add("indented");
                punishmentObject.translateElement(element);
                bountyElement.appendChild(element);
    
                punishmentInstances.push(punishmentObject);
            });
        }

        let linkTo = bountyDefinition.linkTo;

        if(bountyDefinition.timeLimit) {
            let timerElement = document.createElement("p");
            bountyElement.appendChild(timerElement)

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

    public queueBounty(category: string, name: string) {
        this.bountyQueue.push({category: category, name: name});
    }

    private loadQueued() {
        for(let i = this.bountyQueue.length - 1; i >= 0; i--) {
            if (this.activeBounties.length >= MAX_BOUNTIES) return;
            let newBounty = this.bountyQueue.pop()!;
            this.loadBounty(newBounty.category, newBounty.name);
        }
    }

    public update(): void {
        for(let i = this.activeBounties.length - 1; i >= 0; i--) {
            let bounty = this.activeBounties[i];

            bounty.update();

            if (!bounty.queuedForDeletion()) continue;

            bounty.destroyBounty();
            this.activeBounties.splice(i);
        }
        this.loadQueued();
    }
}