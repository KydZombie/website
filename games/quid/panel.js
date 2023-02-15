import * as bounties from "./bounty.js";

export let bountyList = bounties;

let board = document.getElementById("board");

document.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        if (board.classList.contains("closed")) {
            board.classList.remove("closed");
        }
        else {
            board.classList.add("closed");
        }
    }
});