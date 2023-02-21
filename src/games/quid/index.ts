import "../../common/cursor.js";
import * as translator from "../../common/translation.js";
import { BountiesContainer } from "./bounties/bounties-container.js";
import { ItemRequirement } from "./bounties/requirements/item-requirement.js";
import { ClickRequirement } from "./bounties/requirements/click-requirement.js";
import { QuidRequirement } from "./bounties/requirements/quid-requirement.js";
import { QuidReward } from "./bounties/rewards/quid-reward.js";
import { UnlockBuildingReward } from "./bounties/rewards/unlock-building-reward.js";
import { updateDelta } from "../../common/deltaTime.js";
import { QuidPunishment } from "./bounties/punishments/quid-punishment.js";
import { World } from "./world.js";
import { Shop } from "./shop.js";
import { registerMaterials } from "./gameObjects/material.js";

class State {
    private obtained = {};
    private quidElement = document.getElementById("quidcounter")!;
    private quid = 0;

    private loopIndex: number;

    private constructor(
        private bounties: BountiesContainer,
        private shop: Shop,
        private world: World,
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D
    ) {
        this.resizeScreen();
        this.loopIndex = setInterval(() => {
            this.gameLoop();
        }, 0);

        bounties.queueBounty("tutorial", "startingOut");
    }

    public static async init(): Promise<State> {
        await translator.registerAllTranslations();
        await registerMaterials();
        updateDelta();

        const bountyBoard = document.getElementById("bounties");
        if(!bountyBoard)
            throw new Error("Bounty Board HTML element not found");

        const bounties = await BountiesContainer.load("./bounties.json", bountyBoard);

        bounties.useRequirement("item", ItemRequirement);
        bounties.useRequirement("click", ClickRequirement);
        bounties.useRequirement("quid", QuidRequirement);

        bounties.useReward("quid", QuidReward);
        bounties.useReward("unlockBuilding", UnlockBuildingReward);

        bounties.usePunishment("quid", QuidPunishment);

        const canvas = document.getElementById("gamescreen") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        const world = new World(canvas, ctx);

        const panel = document.getElementById("panel")!;

        document.addEventListener("keydown", (e) => {
            if (e.key == ' ') {
                if (panel.classList.contains("closed")) {
                    panel.classList.remove("closed");
                }
                else {
                    panel.classList.add("closed");
                }
            }
        });

        const shop = new Shop();

        return new State(bounties, shop, world, canvas, ctx);
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    update() {
        updateDelta();
        this.bounties.update();

        translator.translateElement(this.quidElement, translator.asyncTranslate("ui.quid"), this.quid);
    }

    draw() {
        this.resizeScreen();
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.draw();
    }

    resizeScreen() {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addQuid(gain: number) {
        this.quid += gain;
    }

    loseQuid(loss: number) {
        this.quid -= loss;
    }

    queueBounty(category: string, name: string) {
        this.bounties.queueBounty(category, name);
    }
}

declare global {
    interface Window { state: State; }
}

(async (): Promise<void> => {
    window.state = await State.init();
})();