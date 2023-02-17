"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMode = exports.addHoveringToTag = exports.addHoveringToAll = exports.addHovering = exports.setStatus = void 0;
let BALL_COUNT = 20;
let BALL_SIZE = 15;
let cursorDiv = document.body.appendChild(document.createElement("div"));
cursorDiv.classList.add("cursor");
let cursorBalls = [];
cursorDiv.style.position = "fixed";
for (let i = 0; i < BALL_COUNT; i++) {
    let newBall = document.createElement("div");
    let size = BALL_SIZE - BALL_SIZE * (i / BALL_COUNT) + "px";
    newBall.classList.add("cursorball");
    newBall.style.left = "0";
    newBall.style.top = "0";
    newBall.style.width = size;
    newBall.style.height = size;
    cursorBalls[i] = newBall;
    cursorDiv.appendChild(newBall);
}
document.addEventListener("mousemove", e => {
    let ball = cursorBalls[0];
    ball.style.left = e.pageX + "px";
    ball.style.top = e.pageY + "px";
});
setInterval(() => {
    for (let i = BALL_COUNT - 1; i >= 0; i--) {
        let ball = cursorBalls[i];
        if (i != 0) {
            let nextBall = cursorBalls[i - 1];
            ball.style.left = nextBall.style.left;
            ball.style.top = nextBall.style.top;
        }
    }
}, 5);
// TODO Multiple colors
function setStatus(status) {
    if (status) {
        cursorDiv.classList.add("hovering");
    }
    else {
        cursorDiv.classList.remove("hovering");
    }
}
exports.setStatus = setStatus;
function addHovering(element) {
    element.addEventListener("mouseenter", () => setStatus(true));
    element.addEventListener("mouseleave", () => setStatus(false));
}
exports.addHovering = addHovering;
function addHoveringToAll(elements) {
    elements.forEach(element => {
        addHovering(element);
    });
}
exports.addHoveringToAll = addHoveringToAll;
function addHoveringToTag(filter) {
    addHoveringToAll(Array.from(document.querySelectorAll(filter)));
}
exports.addHoveringToTag = addHoveringToTag;
// TODO Enum
function setMode(mode) {
    if (mode == "space") {
        cursorBalls.slice(1).forEach(ball => ball.style.transition = '.25s');
    }
}
exports.setMode = setMode;
