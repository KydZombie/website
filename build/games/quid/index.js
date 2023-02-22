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