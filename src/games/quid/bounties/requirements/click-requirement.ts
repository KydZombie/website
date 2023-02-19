import { asyncTranslate, translateElement } from "../../../../common/translation.js";
import type { BountiesContainer } from "../bounties-container.js";
import { Requirement } from "./requirement.js";

export class ClickRequirement implements Requirement {
    private clicked = false;
    public constructor(
        public container: BountiesContainer
    ) {
    }
    translateElement(element: HTMLElement): void {
        translateElement(element, asyncTranslate("requirement.click"));
    }

    click() {
        this.clicked = true;
    }

    isDone(): boolean {
        return this.clicked;
    }

    public update(): void {
        // Requirements
    }

    public terminate(): void {
        
    }
}