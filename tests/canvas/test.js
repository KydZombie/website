import { gameLoop } from "./testgame.js";
import { rainbowLoop } from "/rainbow.js";

let canvas = document.getElementById("background");
let title = document.getElementById("title");
let buttons = document.querySelectorAll("button");
let canvasSpeedSlider = document.getElementById("canvasSpeedRange");
let canvasSquareCountSlider = document.getElementById("canvasSquareCountRange");
let speedBox = document.getElementById("speedinfobox");
let countBox = document.getElementById("countinfobox");
let backgroundColorInput = document.getElementById("colorinput");

let ctx = canvas.getContext("2d");

document.addEventListener("contextmenu", (e) => {
    if (e.target == title || e.target == canvas) {
        e.preventDefault();
    }
});

let testList = document.getElementById("testlist");

function testButtonClicked() {
    const newItem = document.createElement("p");
    newItem.innerHTML = "Hello";
    newItem.className = "p fade-out"
    let returnedItem = testList.appendChild(newItem);

    setTimeout(function () {
        testList.removeChild(returnedItem);
        console.log("a");
    }, 1000);
}

function loop() {
    drawBackground();

    gameLoop();
    rainbowLoop();

    speedBox.innerHTML = `Canvas Update Speed: ${canvasSpeedSlider.value} frames`
    countBox.innerHTML = `Canvas Square Count: ${canvasSquareCountSlider.value}`

    buttons.forEach(button => {
        button.style.backgroundImage = `linear-gradient(hsl(${counter}deg 50% 50%), hsl(${counter + 30}deg 50% 50%))`;
    });

    requestAnimationFrame(loop);
}

let counter = 0;

function colorButtonClicked() {
    canvas.style.setProperty("background-color", backgroundColorInput.value);
}

function drawBackground() {
    if (counter % canvasSpeedSlider.value == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < canvasSquareCountSlider.value; i++) {
            let sizeX = Math.random() * canvas.width;
            let sizeY = Math.random() * canvas.height;
            let posX = Math.random() * canvas.width - (canvas.width / 2);
            let posY = Math.random() * canvas.height - (canvas.height / 2);
            let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            ctx.fillStyle = color;
            ctx.fillRect(posX, posY, sizeX, sizeY);
            ctx.fill();
        }

    }

    counter++;
}

requestAnimationFrame(loop);