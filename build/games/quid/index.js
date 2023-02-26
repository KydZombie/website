var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor(bounties, shop, world, canvas, ctx) {
        this.bounties = bounties;
        this.shop = shop;
        this.world = world;
        this.canvas = canvas;
        this.ctx = ctx;
        this.obtained = {};
        this.quidElement = document.getElementById("quidcounter");
        this.quid = 0;
        this.resizeScreen();
        this.loopIndex = setInterval(() => {
            this.gameLoop();
        }, 0);
        bounties.queueBounty("tutorial", "startingOut");
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield translator.registerAllTranslations();
            yield registerMaterials();
            updateDelta();
            const bountyBoard = document.getElementById("bounties");
            if (!bountyBoard)
                throw new Error("Bounty Board HTML element not found");
            const bounties = yield BountiesContainer.load("./bounties.json", bountyBoard);
            bounties.useRequirement("item", ItemRequirement);
            bounties.useRequirement("click", ClickRequirement);
            bounties.useRequirement("quid", QuidRequirement);
            bounties.useReward("quid", QuidReward);
            bounties.useReward("unlockBuilding", UnlockBuildingReward);
            bounties.usePunishment("quid", QuidPunishment);
            const canvas = document.getElementById("gamescreen");
            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            const world = new World(canvas, ctx);
            const panel = document.getElementById("panel");
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
        });
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    addQuid(gain) {
        this.quid += gain;
    }
    loseQuid(loss) {
        this.quid -= loss;
    }
    queueBounty(category, name) {
        this.bounties.queueBounty(category, name);
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    window.state = yield State.init();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sS0FBSyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFOUQsTUFBTSxLQUFLO0lBT1AsWUFDWSxRQUEyQixFQUMzQixJQUFVLEVBQ1YsS0FBWSxFQUNaLE1BQXlCLEVBQ3pCLEdBQTZCO1FBSjdCLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFYakMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNk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