import * as vector from "../../../common/vector.js";
import * as textureManager from "../../../common/textureManager.js";
export let sprites = new Array;
export class Sprite {
    constructor(data, xOrPos, y) {
        this.data = data;
        if (xOrPos instanceof vector.Pos) {
            this.pos = xOrPos;
        }
        else if (xOrPos != null && y != null) {
            this.pos = new vector.Pos(xOrPos, y);
        }
        else {
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
}
export class SpriteData {
    constructor(name, textureId) {
        this.name = name;
        this.textureId = textureId;
        this.texture = textureManager.getTexture(`assets/${textureId}.png`);
    }
    spawn(xOrPos, y) {
        sprites.push(new Sprite(this, xOrPos, y));
    }
    registerTexture(texture) {
        this.texture = texture;
    }
    draw(xOrPos, y) {
        if (!this.texture)
            return;
        if (xOrPos instanceof vector.Pos) {
            window.state.ctx.drawImage(this.texture, xOrPos.x, xOrPos.y);
        }
        else if (y != null) {
            window.state.ctx.drawImage(this.texture, xOrPos, y);
        }
    }
    click(object) { }
    update(object) { }
}
