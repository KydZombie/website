class ImageCache {
}
let cache = [];
export function getTexture(textureId) {
    if (!cache[textureId]) {
        let cachedImage = new Image();
        cachedImage.src = textureId;
        cache[textureId] = cachedImage;
    }
    return cache[textureId];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dHVyZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3RleHR1cmVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVTtDQUVmO0FBRUQsSUFBSSxLQUFLLEdBQWUsRUFBRSxDQUFDO0FBRTNCLE1BQU0sVUFBVSxVQUFVLENBQUMsU0FBaUI7SUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQixJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzlCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7S0FDbEM7SUFDRCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=