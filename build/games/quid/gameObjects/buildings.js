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
        this.material = args.material;
    }
    draw(ctx, offset, size) {
        super.draw(ctx, offset, size);
        // console.log(this.material);
        // console.log(`hue-rotate(${this.material.color.hue}), saturate(${this.material.color.saturation})`);
        // console.log("hue-rotate(" + this.material.color.hue + "), saturate(" + this.material.color.saturation + ")");
        ctx.filter = "hue-rotate(" + this.material.color.hue + "), saturate(" + this.material.color.saturation + ")";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3F1aWQvZ2FtZU9iamVjdHMvYnVpbGRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sWUFBWTtJQUFsQjtRQUNJLFVBQUssR0FBVSxFQUFFLENBQUM7SUFZdEIsQ0FBQztJQVZHLFVBQVUsQ0FBQyxXQUFtQjtRQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZUFBZSxDQUFDLFdBQW1CO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDSjtBQUVELElBQUksWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFFdEMsTUFBTSxPQUFPLGlCQUFpQjtJQUsxQjtRQUhBLE1BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ04sWUFBTyxHQUFHLEtBQUssQ0FBQztJQUViLENBQUM7SUFFSixVQUFVLENBQUMsU0FBaUI7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMs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