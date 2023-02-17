let cache = [];

export function getTexture(textureId) {
    if (!cache[textureId]) {
        let cachedImage = new Image();
        cachedImage.src = textureId;
        cache[textureId] = cachedImage;
    }
    return cache[textureId];
}