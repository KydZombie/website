import * as cursor from "/common/cursor.js";

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

let bounties = Array.from(document.getElementsByClassName("bounty"));

bounties.forEach(hoveringBounty => {
    hoveringBounty.addEventListener("mouseenter", () => {
        bounties.forEach(bounty => {
            if (bounty == hoveringBounty) {
                
            }
            else {
                bounty.hidden = true;
            }
        });
    });
    hoveringBounty.addEventListener("mouseleave", () => {
        bounties.forEach(bounty => {
            bounty.hidden = false;
        });
    });
});