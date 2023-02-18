import { BountiesContainer } from "./bounties-container"

export type BountyDefinition = {
    description: string,
    timeLeft: number | undefined,
    requirements: {
        name: string,
        args: any
    }[]
}

export type BountiesDefinition = {
    [categoryName: string]:  {
        [bountyName: string]: BountyDefinition;
    }
}

type RequirementType = { new (container: BountiesContainer, args?: any): InstanceType<any> };