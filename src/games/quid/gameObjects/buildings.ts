import type { Material } from "./material";

export interface Cache {
    [key: string]: HTMLImageElement;
}

class TextureCache {
    cache: Cache = {};

    getTexture(textureName: string): HTMLImageElement {
        if (this.cache[textureName]) return this.cache[textureName];
        return this.registerTexture(textureName);
    }

    registerTexture(textureName: string) {
        this.cache[textureName]  = new Image();
        this.cache[textureName].src = textureName;
        return this.cache[textureName];
    }
}

let textureCache = new TextureCache();

export class BuildingHighlight {
    texture?: HTMLImageElement;
    x = 0;
    y = 0;
    enabled = false;
    constructor(
    ) {}

    setTexture(textureId: string) {
        this.texture = textureCache.getTexture(textureId);
    }

    move(x: number, y: number) {
        this.enabled = true;
        this.x = x;
        this.y = y;
    }

    disable() {
        this.enabled = false;
    }

    draw(ctx: CanvasRenderingContext2D, offset: {x: number, y: number}, size: number) {
        if (!this.texture || !this.enabled) return;
        ctx.globalAlpha = 0.75;
        ctx.drawImage(this.texture, this.x * size + offset.x, this.y * size + offset.y, size, size);
        ctx.globalAlpha = 1;
    }
}

export class Building {
    texture: HTMLImageElement;
    constructor(
        textureId: string,
        protected x: number,
        protected y: number
    ) {
        this.texture = textureCache.getTexture(textureId);
    }

    draw(ctx: CanvasRenderingContext2D, offset: {x: number, y: number}, size: number) {
        ctx.drawImage(this.texture, this.x * size + offset.x, this.y * size + offset.y, size, size);
    }
}

export class Ore extends Building {
    overlay: HTMLImageElement;

    constructor(protected material: Material, x: number, y: number) {
        super("assets/building/ore.png", x, y);
        this.overlay = textureCache.getTexture("assets/item/metalRaw.png");
    }

    draw(ctx: CanvasRenderingContext2D, offset: {x: number, y: number}, size: number) {
        super.draw(ctx, offset, size);
        ctx.drawImage(this.overlay, this.x * size + offset.x, this.y * size + offset.y, size, size);
    }
}
