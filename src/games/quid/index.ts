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
    private obtained = {};
    quid = 0;
    public canvas = document.getElementById("gamescreen") as HTMLCanvasElement;
    public ctx = (document.getElementById("gamescreen") as HTMLCanvasElement).getContext("2d")!;
    
    public world = new World();
    sprites = sprites;
    panel = panel;

    private loopIndex: number;

    private constructor(
        private bounties: BountiesContainer
    ) {
        this.resizeScreen();
        this.loopIndex = setInterval(() => {
            this.gameLoop();
        }, 0);

        bounties.loadBounty("tutorial", "startingOut");
    }

    public static async init(): Promise<State> {
        await translator.registerAllTranslations();

        const bountyBoard = document.getElementById("bountyboard");
        if(!bountyBoard)
            throw new Error("Bounty Board HTML element not found");

        const bounties = await BountiesContainer.load("./bounties.json", bountyBoard);

        bounties.useRequirement("item", ItemRequirement);
        bounties.useRequirement("click", ClickRequirement);

        return new State(bounties);
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
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

declare global {
    interface Window { state: State; }
}

(async (): Promise<void> => {
    window.state = await State.init();
})();