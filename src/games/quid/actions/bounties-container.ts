import { Bounty } from "./bounty";
import { BountyDefinition, RequirementType } from "./definitions";
import { Requirement } from "./requirements/requirement";

export class BountiesContainer {
    private requirementTypes: Map<string, RequirementType> = new Map();
    private activeBounties: Bounty[] = [];

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

    public loadBounty(category: string, name: string): void {
        const bountyDefinition = this.getBountyDefinition(category, name);
        const requirementsInstances: Requirement[] = [];
        
        bountyDefinition.requirements.forEach(requirement => {
            const reqType = this.requirementTypes.get(requirement.name);
            if(!reqType)
                throw new Error("requirement with name " + requirement.name + " not found, have you forgot to add it to `useRequirement` ?");

                requirementsInstances.push(new reqType(this, requirement.args));
        });

        if(bountyDefinition.timeLeft) {
            // START TIMER
        }
        this.activeBounties.push(new Bounty(requirementsInstances));
    }

    public update(): void {
        this.activeBounties.forEach((bounty) => {
            bounty.update();
        });
    }
}