var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as translator from "../../common/translation.js";
// import * as items from "./items.js";
// import * as buildings from "./buildings.js";
import { sprites } from "./sprite.js";
import { World } from "./world.js";
import * as panel from "./panel.js";
import { BountiesContainer } from "./actions/bounties-container.js";
import { ItemRequirement } from "./actions/requirements/item-requirement.js";
import { ClickRequirement } from "./actions/requirements/click-requirement.js";
class State {
    constructor(bounties) {
        this.bounties = bounties;
        this.obtained = {};
        this.quid = 0;
        this.canvas = document.getElementById("gamescreen");
        this.ctx = document.getElementById("gamescreen").getContext("2d");
        this.world = new World();
        this.sprites = sprites;
        this.panel = panel;
        this.resizeScreen();
        this.loopIndex = setInterval(() => {
            this.gameLoop();
        }, 0);
        bounties.loadBounty("tutorial", "startingOut");
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield translator.registerAllTranslations();
            const bountyBoard = document.getElementById("bountyboard");
            if (!bountyBoard)
                throw new Error("Bounty Board HTML element not found");
            const bounties = yield BountiesContainer.load("./bounties.json", bountyBoard);
            bounties.useRequirement("item", ItemRequirement);
            bounties.useRequirement("click", ClickRequirement);
            return new State(bounties);
        });
    }
    gameLoop() {
        this.update();
        this.draw();
    }
    update() {
        this.panel.updateBounties();
        this.bounties.update();
    }
    draw() {
        this.resizeScreen();
        this.world.draw();
    }
    resizeScreen() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    window.state = yield State.init();
}))();
