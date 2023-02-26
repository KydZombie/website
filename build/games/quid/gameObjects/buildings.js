import { Material } from "./material.js";
class TextureCache {
    constructor() {
        this.cache = {};
    }
    getTexture(textureName) {
        if (this.cache[textureName])
            return this.cache[textureName];
        return this.registerTexture(textureName);
    }
    registerTexture(textureName) {
        this.cache[textureName] = new Image();
        this.cache[textureName].src = textureName;
        return this.cache[textureName];
    }
}
let textureCache = new TextureCache();
export class BuildingHighlight {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.enabled = false;
    }
    setTexture(textureId) {
        this.texture = textureCache.getTexture(textureId);
    }
    move(x, y) {
        this.enabled = true;
        this.x = x;
        this.y = y;
    }
    disable() {
        this.enabled = false;
    }
    draw(ctx, offset, size) {
        if (!this.texture || !this.enabled)
            return;
        ctx.globalAlpha = 0.75;
        ctx.drawImage(this.texture, this.x * size + offset.x, this.y * size + offset.y, size, size);
        ctx.globalAlpha = 1;
    }
}
export class Building {
    constructor(textureId, x, y) {
        this.x = x;
        this.y = y;
        this.texture = textureCache.getTexture(textureId);
    }
    draw(ctx, offset, size) {
        ctx.drawImage(this.texture, this.x * size + offset.x, this.y * size + offset.y, size, size);
    }
}
export class Ore extends Building {
    constructor(x, y, args) {
        super("assets/building/stone.png", x, y);
        this.overlay = textureCache.getTexture("assets/building/oreOverlay.png");
        if (args instanceof Material) {
            this.material = args;
        }
        else {
            if (args.material != undefined) {
                this.material = args.material;
            }
            else {
                this.material = args[0];
            }
        }
        console.log(this.material);
    }
    draw(ctx, offset, size) {
        super.draw(ctx, offset, size);
        // console.log(`hue-rotate(${this.material.color.hue}), saturate(${this.material.color.saturation})`);
        // console.log("hue-rotate(" + this.material.color.hue + "), saturate(" + this.material.color.saturation + ")");
        ctx.filter = `hue-rotate(${this.material.color.hue}), saturate(${this.material.color.saturation})`;
        ctx.drawImage(this.overlay, this.x * size + offset.x, this.y * size + offset.y, size, size);
        ctx.filter = "none";
        // ctx.globalCompositeOperation = "overlay";
        // ctx.fillRect(this.x * size + offset.x, this.y * size + offset.y, size, size);
        // ctx.fillStyle = "blue";
        // ctx.globalCompositeOperation = "source-atop";
        // // ctx.globalCompositeOperation = "destination-out";
        // ctx.drawImage(this.overlay, this.x * size + offset.x, this.y * size + offset.y, size, size);
        // ctx.globalCompositeOperation = "source-over";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvZ2FtZU9iamVjdHMvYnVpbGRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNekMsTUFBTSxZQUFZO0lBQWxCO1FBQ0ksVUFBSyxHQUFVLEVBQUUsQ0FBQztJQVl0QixDQUFDO0lBVkcsVUFBVSxDQUFDLFdBQW1CO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBbUI7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNKO0FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUV0QyxNQUFNLE9BQU8saUJBQWlCO0lBSzFCO1FBSEEsTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRWIsQ0FBQztJQUVKLFVBQVUsQ0FBQyxTQUFpQjtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNyQixJQUFJLENBQUMs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