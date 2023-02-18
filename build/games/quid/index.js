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
import { BountyLoader } from "./actions/bounty-loader.js";
import { BountiesContainer } from "./actions/bounties-container.js";
import { ItemRequirement } from "./actions/requirements/item-requirement.js";
import { ClickRequirement } from "./actions/requirements/click-requirement.js";
class State {
    constructor(actions) {
        this.actions = actions;
        this.obtained = {};
        this.quid = 0;
        this.canvas = document.getElementById("gamescreen");
        this.ctx = document.getElementById("gamescreen").getContext("2d");
        this.world = new World();
        this.sprites = sprites;
        this.panel = panel;
        this.resizeScreen();
        this.loopInterval = setInterval(() => {
            this.gameLoop();
        }, 0);
        actions.loadBounty("tutorial", "startingOut");
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield translator.registerAllTranslations();
            const bounties = yield BountyLoader.load("./bounties.json");
            const panel = document.getElementById("panel");
            if (!panel)
                throw new Error("Panel HTML element not found");
            const actions = new BountiesContainer(panel, bounties);
            actions.useRequirement("item", ItemRequirement);
            actions.useRequirement("click", ClickRequirement);
            return new State(actions);
        });
    }
    gameLoop() {
        // this.update();
        this.draw();
    }
    update() {
        this.panel.updateBounties();
        this.actions.update();
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
