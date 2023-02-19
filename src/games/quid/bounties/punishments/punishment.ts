import { BountyItem } from "../bounty-item.js";

export interface Punishment extends BountyItem {
    punish(): void;
}