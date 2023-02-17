import * as state from "./state.js";
import * as translator from "../../common/translation.js";
import * as panel from "./panel.js";
import * as items from "./items.js";
import * as buildings from "./buildings.js";
import * as gameObjects from "./gameObject.js";
import * as bounties from "./bounty.js";
import * as world from "./world.js";

let canvas = state.canvas;

function init() {
    translator.registerAllTranslations().then(() => start());
    state.setBounties(bounties);
    state.setBuildings(buildings);
    state.setWorld(world);
    state.setPanel(panel);
    state.setItems(items);
    state.setGameObjects(gameObjects);
}

function resizeScreen() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function start() {
    buildings.createBuildings();
    
    world.initWorld();

    bounties.addBounty("tutorial.startingOut");

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