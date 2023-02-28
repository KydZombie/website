let canvas = document.getElementById("gamescreen") as HTMLCanvasElement;
let ctx = canvas.getContext("2d")!;

ctx.fillStyle = "#ff0000";
ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

setInterval(() => {
    ctx.fillStyle = (ctx.fillStyle == "#ff0000")? "#808080": "#ff0000";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
}, 500);