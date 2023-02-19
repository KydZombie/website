import { BountyItem } from "../bounty-item.js";

export interface Requirement extends BountyItem {
    isDone(): boolean;
}