let lastUpdate = Date.now();
let deltaInterval = setInterval(updateDelta, 0);
let deltaTime = 0;

export function getDeltaTime() {
    return deltaTime;
}

function updateDelta() {
    let now = Date.now();
    deltaTime = now - lastUpdate;
    lastUpdate = now;
}