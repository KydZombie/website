import { rainbowLoop } from "./rainbow.js";

function loop() {
    rainbowLoop();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);