import * as state from "./state.js";
import * as vector from "../../common/vector.js";
import * as textureManager from "../../common/textureManager.js";

let ctx = state.ctx;

export let gameObjects = [];

export class GameObject {
    constructor(data, xOrPos, y) {
        /** @type {GameObjectData} data */
        this.data = data;

        if (xOrPos != undefined && y != undefined) {
            this.pos = new vector.Pos(xOrPos, y);
        } else if (xOrPos != undefined && y == undefined) {
            this.pos = xOrPos;
        } else {
            this.pos = new vector.Pos(0, 0);
        }
    }
    click() {
        this.data.click(this);
    }
    update() {
        this.data.update(this);
    }
    draw() {
        this.data.draw(this.pos.x, this.pos.y);
    }
    drawOnGrid() {
        let x = state.worldOffset.x + (this.pos.x * state.tileSize);
        let y = state.worldOffset.y + (this.pos.y * state.tileSize);
        this.data.draw(x, y);
    }
}

export class GameObjectData {
    constructor(name, texture) {
        this.name = name;
        this.textureId = texture;

        this.texture = textureManager.getTexture(`assets/${texture}.png`);

        // textureManager.getTexture(texture).then(newTexture => this.registerTexture(newTexture));
    }
    registerTexture(texture) {
        console.log(texture);
        this.texture = texture;
    }
    click(object) {

    }
    update(object) {

    }
    draw(x, y) {
        if (this.texture) {
            state.ctx.drawImage(this.texture, x, y);
        }
    }
}

export function spawnObject(data, x, y) {

}