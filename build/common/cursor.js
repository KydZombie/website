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
export function setStatus(status) {
    if (status) {
        cursorDiv.classList.add("hovering");
    }
    else {
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
export function addHoveringToTag(filter) {
    addHoveringToAll(Array.from(document.querySelectorAll(filter)));
}
// TODO Enum
export function setMode(mode) {
    if (mode == "space") {
        cursorBalls.slice(1).forEach(ball => ball.style.transition = '.25s');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9jdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsSUFBSSxXQUFXLEdBQWtCLEVBQUUsQ0FBQztBQUVwQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFFbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzNELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUM1QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLFNBQVMsQ0FBQyxXQUFXLENB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