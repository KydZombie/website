const canvas = document.getElementById("gamecanvas")
const ctx = canvas.getContext("2d");

let keys = [];
keys["shift"] = false;

document.addEventListener("keydown", (e) => {
    if (!(e.target == document.body)) return;
    keys[e.key.toLowerCase()] = true;
    if (e.key == ' ') {
        return false;
    }
});
document.addEventListener("keyup", (e) => {
    if (!(e.target == document.body)) return;
    keys[e.key.toLowerCase()] = false;
});

let player = {x: 0, y: 0, velocity: {x: 0, y: 0}, color: "red", speed: 0};

let lastUpdate = Date.now();
let deltaTime = 0;

function gameLoop() {
    let now = Date.now();
    deltaTime = now - lastUpdate;
    lastUpdate = now;

    updateInput();
    movePlayer();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, 80, 80);
    ctx.fill();

    requestAnimationFrame(gameLoop);
}

const SPEED = 0.5;
const SPRINT_MULTIPLIER = 2;

function updateInput() {
    if (keys["shift"]) {
        player.speed = SPEED * SPRINT_MULTIPLIER * deltaTime;
    }
    else {
        player.speed = SPEED * deltaTime;
    }

    player.velocity.x = 0;
    player.velocity.y = 0;

    if (keys['w']) {
        player.velocity.y = -1;
    } else if (keys['s']) {
        player.velocity.y = 1;
    }
    if (keys['a']) {
        player.velocity.x = -1;
    } else if (keys['d']) {
        player.velocity.x = 1;
    }

    if (keys[' ']) {
        player.color = "green";
    }
    else {
        player.color = "red";
    }
}

function movePlayer() {
    let length = Math.sqrt(player.velocity.x*player.velocity.x+player.velocity.y*player.velocity.y); //calculating length
    player.velocity.x = player.velocity.x/length; //assigning new value to x (dividing x by length of the vector)
    player.velocity.y= player.velocity.y/length; //assigning new value to y

    if (!isNaN(player.velocity.x)) {
        player.x += player.velocity.x * player.speed;
    }
    if (!isNaN(player.velocity.y)) {
        player.y += player.velocity.y * player.speed;
    }
}


export { gameLoop };