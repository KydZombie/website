import { BountiesContainer } from "./bounties-container.js"

export type BountyDefinition = {
    description: string,
    requirements: {
        name: string,
        args: any
    }[],
    rewards: {
        name: string,
        args: any
    }[],
    punishments?: {
        name: string,
        args: any
    }[],
    linkTo?: BountyLink
    timeLimit?: number,
}

export type BountyLink = {
    category: string,
    name: string
}

export type BountiesDefinition = {
    [categoryName: string]:  {
        [bountyName: string]: BountyDefinition;
    }
}

type RequirementType = { new (container: BountiesContainer, args?: any): InstanceType<any> };

type RewardType = { new (container: BountiesContainer, args?: any): InstanceType<any> };

type PunishmentType = { new (container: BountiesContainer, args?: any): InstanceType<any> };