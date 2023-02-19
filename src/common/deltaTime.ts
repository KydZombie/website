let time = Date.now();

let deltaTime = 0;
export function updateDelta() {
    let now = Date.now();
    deltaTime = now - time;
    time = now;
}

export function getDeltaTime() {
    return deltaTime / 1000;
}