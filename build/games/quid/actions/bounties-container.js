var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Bounty } from "./bounty";
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
    loadBounty(category, name) {
        const bountyDefinition = this.getBountyDefinition(category, name);
        const requirementsInstances = [];
        bountyDefinition.requirements.forEach(requirement => {
            const reqType = this.requirementTypes.get(requirement.name);
            if (!reqType)
                throw new Error("requirement with name " + requirement.name + " not found, have you forgot to add it to `useRequirement` ?");
            requirementsInstances.push(new reqType(this, requirement.args));
        });
        if (bountyDefinition.timeLeft) {
            // START TIMER
        }
        this.activeBounties.push(new Bounty(requirementsInstances));
    }
    update() {
        this.activeBounties.forEach((bounty) => {
            bounty.update();
        });
    }
}
