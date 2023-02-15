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
  newBall.style.left = 0;
  newBall.style.top = 0;
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

export function setStatus(status) {
  if (status) {
    cursorDiv.classList.add("hovering");
  } else {
    cursorDiv.classList.remove("hovering");
  }
}

export function addHovering(element) {
  element.addEventListener("mouseenter", () => setStatus(true));
  element.addEventListener("mouseleave", () => setStatus(false));
}

export function addHoveringToAll(elements) {
  elements.forEach(element => {
    addHovering(element);
  });
}

export function setMode(mode) {
  if (mode == "space") {
    cursorBalls.slice(1).forEach(ball=>ball.style.transition = '.25s');
  }
}
