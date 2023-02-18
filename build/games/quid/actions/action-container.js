export class BountiesContainer {
    constructor(rootElement, bounties) {
        this.rootElement = rootElement;
        this.bounties = bounties;
        this.requirementTypes = new Map();
        this.activeBounties = [];
    }
    useRequirement(name, type) {
        this.requirementTypes.set(name, type);
    }
    loadBounty(category, name) {
        const bounty = this.bounties.getBounty(category, name);
        bounty.requirements.forEach(requirement => {
            const reqType = this.requirementTypes.get(requirement.name);
            if (!reqType)
                throw new Error("requirement with name " + requirement.name + " not found, have you forgot to add it to `useRequirement` ?");
            this.activeRequirements.push(new reqType(this, requirement.args));
        });
    }
    update() {
        this.activeRequirements.forEach((req) => {
            req.update();
        });
    }
}
