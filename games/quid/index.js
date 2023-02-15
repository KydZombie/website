import * as cursor from "../../common/cursor.js";
import * as jsonLoader from "../../common/json-loader.js";
import * as panel from "./panel.js";

let bounties = panel.bountyList;

let state = {
    obtained: {},
    quid: 0
};
const {resources, quid} = state;

bounties.addBounty("tutorial.startingOut");

function loop() {
    bounties.checkAll(state);
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);