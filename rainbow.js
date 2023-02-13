const rainbowElements = document.getElementsByClassName("rainbow");

let rbFrames = 0;
function rainbowLoop() {
    for (let i = 0; i < rainbowElements.length; i++) {
        rainbowElements.item(i).style.backgroundImage = `linear-gradient(hsl(${rbFrames}deg 20% 50%), hsl(${rbFrames + 30}deg 20% 50%))`;;
    }

    rbFrames++;
}

export { rainbowLoop };