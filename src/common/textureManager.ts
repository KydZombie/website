class ImageCache {
    [key: string]: any;
}

let cache: ImageCache = [];

export function getTexture(textureId: string): HTMLImageElement {
    if (!cache[textureId]) {
        let cachedImage = new Image();
        cachedImage.src = textureId;
        cache[textureId] = cachedImage;
    }
    return cache[textureId];
}