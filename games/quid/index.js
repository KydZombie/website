import * as cursor from "../../common/cursor.js";
import * as translator from "../../common/translation.js";
import * as panel from "./panel.js";
import * as world from "./world.js";
import * as materials from "./materials.js";

let canvas = document.getElementById("gamescreen");

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

let bounties = panel.bountyList;

let buildings = {

}

class State {
    constructor() {
        this.cursor = cursor;
        this.obtained = {};
        this.quid = 0;
        this.buildings = buildings;
        this.canvas = canvas;
        this.ctx = ctx;
        this.world = world;
    }
    gainQuid(gain) {
        this.quid += gain;
    }
    loseQuid(loss) {
        this.quid -= loss;
    }
}

let state = new State;

class Building {
    constructor() {
    }
    click() {

    }
    update() {

    }
}

function init() {
    translator.registerAllTranslations().then(() => start());
}

function resizeScreen() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function start() {
    bounties.setState(state);
    bounties.addBounty("tutorial.startingOut");

    world.setState(state);

    resizeScreen();

    canvas.addEventListener("click", e => {
        world.click(e.clientX, e.clientY);
    });

    requestAnimationFrame(loop);
}

function loop() {
    update();
    draw();

    world.drawWorld();

    requestAnimationFrame(loop);
}

function update() {
    bounties.checkAll(state);
}

function draw() {
    resizeScreen();
    
}

init();