import * as state from "./state.js";
state.setPanel(this);

let panel = document.getElementById("panel");

document.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        if (panel.classList.contains("closed")) {
            panel.classList.remove("closed");
        }
        else {
            panel.classList.add("closed");
        }
    }
});