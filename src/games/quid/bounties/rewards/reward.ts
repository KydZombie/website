import { BountyItem } from "../bounty-item.js";

export interface Reward extends BountyItem {
    giveReward(): void;
}