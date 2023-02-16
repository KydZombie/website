import * as cursor from "../../common/cursor.js";
import * as translator from "../../common/translation.js";
import * as panel from "./panel.js";

let bounties = panel.bountyList;

class State {
    constructor() {
        this.cursor = cursor;
        this.obtained = {};
        this.quid = 0;
    }
    gainQuid(gain) {
        this.quid += gain;
    }
    loseQuid(loss) {
        this.quid -= loss;
    }
}

let state = new State;

function init() {
    translator.registerAllTranslations().then(() => start());
}

function start() {
    bounties.setState(state);
    bounties.addBounty("tutorial.startingOut");
    requestAnimationFrame(loop);
}

function loop() {
    bounties.checkAll(state);
    requestAnimationFrame(loop);
}

init();