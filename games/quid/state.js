export * as cursor from "../../common/cursor.js";
import * as vector from "../../common/vector.js";

export let obtained = {};
export let quid = 0;
/** @type {HTMLCanvasElement} */
export let canvas = document.getElementById("gamescreen");
export let ctx = canvas.getContext("2d");
export let buildings;
export let world;
export let bounties;
export let items;
export let gameObjects;
export let panel;

export const WORLD_SIZE = 50;
export let tileSize = 50;
export let worldOffset = new vector.Pos(0, 0);

export function gainQuid(gain) {
    quid += gain;
}

export function loseQuid(loss) {
    quid -= loss;
}

export function setBuildings(newBuildings) {
    buildings = newBuildings;
}

export function setPanel(newPanel) {
    panel = newPanel;
}

export function setBounties(newBounties) {
    bounties = newBounties;
}

export function setWorld(newWorld) {
    world = newWorld;
}

export function setItems(newItems) {
    items = newItems;
}

export function setGameObjects(newGameObjects) {
    gameObjects = newGameObjects;
}