import * as translator from "../../common/translation.js";
import * as panel from "./panel.js";
// import * as items from "./items.js";
// import * as buildings from "./buildings.js";
// import * as gameObjects from "./gameObject.js";
// import * as world from "./world.js";
import * as vector from "../../common/vector.js";



class State {
    worldOffset = new vector.Pos(0, 0);
    obtained = {};
    quid = 0;
    canvas = document.getElementById("gamescreen") as HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    
    // world = world;
    // gameObjects = gameObjects;
    panel = panel;

    constructor() {
        this.ctx = this.canvas.getContext("2d")!;
    }

    start() {
        // buildings.createBuildings();
        
        // world.initWorld();
    
        this.panel.addBounty("tutorial.startingOut");
    
        resizeScreen();
    
        // this.canvas.addEventListener("click", (e: MouseEvent) => {
        //     world.click(e.clientX, e.clientY);
        // });
    
        requestAnimationFrame(this.loop);
    }

    loop() {
        this.update();
        this.draw();
    
        // world.drawWorld();
    
        requestAnimationFrame(this.loop);
    }

    update() {
        this.panel.updateBounties();
    }

    draw() {
        resizeScreen();
    }
}

let state: State;

function resizeScreen() {
    state.canvas.width  = window.innerWidth;
    state.canvas.height = window.innerHeight;
}

translator.registerAllTranslations().then(() => state = new State());