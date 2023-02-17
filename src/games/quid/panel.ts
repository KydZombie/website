import * as jsonLoader from "../../common/json-loader";
import * as translator from "../../common/translation.js";
import * as cursor from "../../common/cursor.js";
import * as data from "./data.js";

let panel = document.getElementById("panel")!;
const bountyLimit = 4;

let bountyJson = jsonLoader.getJson("bounties.json");

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

let bountyBoard = {
    element: document.getElementById("bounties")!,
    bounties: new Array<Bounty>()
}

interface BountyItem {
    element: HTMLElement;
    updateElementText(): void;
    addToBoard(sourceElement: HTMLElement): void;
}

abstract class Requirement implements BountyItem {
    element = document.createElement("p")!;
    fulfilled = false;

    abstract updateElementText(): void;
    abstract checkFulfilled(): boolean;

    addToBoard(bountyElement: HTMLElement) {
        this.updateElementText();
        bountyElement.append(this.element);
    }
    fulfill() {
        this.fulfilled = true;
    }
    isFulfilled() {
        if (this.fulfilled) return true;
        
        return this.checkFulfilled();
    }
}

class ItemRequirement extends Requirement {
    type: string;
    amount: number;
    constructor(type: string, amount: number) {
        super();
        this.type = type;
        this.amount = amount;
    }
    updateElementText() {
        translator.translateElement(this.element, translator.asyncTranslate(`item.${this.type}`), ": ", this.amount.toString());
        this.element.appendChild(this.element);
    }
    checkFulfilled(): boolean {
        throw new Error("Method not implemented.");
    }
}

// class ClickRequirement implements Requirement {
//     element: HTMLParagraphElement;
//     fulfilled: boolean;
//     translateElement(): void {
//         throw new Error("Method not implemented.");
//     }
//     checkFulfilled(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     fulfill(): void {
//         throw new Error("Method not implemented.");
//     }
//     isFulfilled(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     addToBoard(bountyElement: HTMLElement): void {

//     }
// }

abstract class Reward implements BountyItem {
    element = document.createElement("p");

    abstract updateElementText(): void;
   
    addToBoard(sourceElement: HTMLElement) {
        this.updateElementText();
        sourceElement.append(this.element);
    }
}

class QuidReward extends Reward {
    amount: number;
    constructor(amount: number) {
        super();
        this.amount = amount;
    }
    updateElementText(): void {
        translator.translateElement(this.element, translator.asyncTranslate(`item.quid`), ": ", this.amount.toString());
        this.element.appendChild(this.element);
    }
}

// class ItemReward extends Reward {
//     type: string;
//     amount: number;
//     constructor(type: string, amount: number) {
//         super();
//         this.type = type;
//         this.amount = amount;
//     }
//     updateElementText(): void {
//         translator.translateElement(this.element, translator.asyncTranslate(`item.${this.type}`), ": ", this.amount.toString());
//         this.element.appendChild(this.element);
//     }
// }

abstract class Punishment implements BountyItem {
    element = document.createElement("p");
    abstract updateElementText(): void;
    addToBoard(sourceElement: HTMLElement): void {
        this.updateElementText();
        sourceElement.append(this.element);
    }
    abstract punish(): void;
}

class QuidPunishment extends Punishment {
    loss: number;
    constructor(loss: number) {
        super();
        this.loss = loss;
    }
    updateElementText(): void {
        translator.translateElement(this.element, translator.asyncTranslate(`item.quid`), ": ", this.loss.toString());
        this.element.appendChild(this.element);
    }
    punish() {
        console.log(`Would have taken ${this.loss} Quid`);
    }
}

export class Bounty {
    name: string;
    description: string;
    requirements: Requirement[];
    rewards: Reward[];
    punishments?: Punishment[];
    linkTo?: string;
    timeLimit?: number;
    timeRemaining?: number;
    otherData?;

    element: HTMLElement = document.createElement("div")!;

    

    accepted = false;
    isReady = false;
    failed = false;
    constructor(json: jsonLoader.ParsedJson, name: string) {
        this.name = name;
        this.description = json.description;
        this.requirements = json.requirements;
        this.rewards = json.rewards;
        this.punishments = json.punishments;
        this.linkTo = json.linkTo;
        this.timeLimit = json.description;
        this.otherData = json.otherData;

        if (!this.otherData) {
            this.otherData = {};
        }

        if (this.timeLimit) {
            this.timeRemaining = this.timeLimit;
        }

        this.createBountyIcon(json);

        this.element.addEventListener("click", () => this.onClick());

        bountyBoard.element.appendChild(this.element);

        bountyBoard.bounties[name] = this;
    }
    createBountyIcon(json: jsonLoader.ParsedJson) {
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        
        // this.element = document.createElement("div");
        this.element.classList.add("bounty");
        this.element.dataset.bounty = this.name;

        let name = document.createElement("h1");
        te(name, atl(`bounty.${this.name}`));
        this.element.appendChild(name);

        this.addJsonPart(json.requirements, "requirement");
        this.addJsonPart(json.rewards, "reward");
        this.addJsonPart(json.punishments, "punishment");
        this.addJsonPart(json.timeLimit, "timeLimit");

        cursor.addHovering(this.element);
    }
    addJsonPart(categoryData: BountyItem[] | BountyItem, categoryName: string) {
        if (!categoryData) return;

        let atl = translator.asyncTranslate;
        let te = translator.translateElement;

        let newPartText = document.createElement("p");
        te(newPartText, atl(`ui.${categoryName}`), ":");
        this.element.appendChild(newPartText);

        if (categoryData instanceof Array) {
            categoryData.forEach(bounty => {
                bounty.addToBoard(this.element);
            });
        }
        else {
            categoryData.addToBoard(this.element);
        }
    }
    onClick() {
        if (this.accepted) {
            if (this.isReady) {
                this.complete();
                return;
            }
            else if (this.failed) {
                this.fail();
                return;
            }

            // if (this.requirements) {
            //     this.requirements.abstract.forEach(bounty => {
            //         if (bounty == "click") {
            //             this.setReady();
            //         }
            //     });
            // }

        }
        else {
            this.accept();
        }
    }
    accept() {
        this.accepted = true;

        this.element.classList.add("accepted");

        if (this.timeLimit) this.startTimer();
    }
    complete() {
        if (this.linkTo) {
            addBounty(this.linkTo);
        }
        if (this.otherData.endTutorial) {
            addRandomBounty();
        }
        this.dismiss();
    }
    updateStatus() {
        let tempIsReady = true;
        for (const requirement of this.requirements) {
            if (!requirement.checkFulfilled()) {
                tempIsReady = false;
                return;
            }
        }
        this.isReady = tempIsReady || this.isReady;
    }
    updateTimeRemaining() {
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        let timeLimitElement = this.element.getElementsByClassName("timelimit").item(0) as HTMLElement;
        te(timeLimitElement, atl("ui.timeLimit"), ": ", this.timeRemaining!.toString());
    }
    setReady() {
        this.isReady = true;

        this.element.classList.add("ready");
    }
    fail() {
        if (!this.name.includes("random")) {
            addBounty(this.name);
        }
        if (this.punishments != undefined) {
            for (const punishment of this.punishments) {
                punishment.
            }
        }
        
        this.dismiss();
    }
    setFailed() {
        this.failed = true

        this.element.classList.add("failed");
    }
    dismiss() {
        bountyBoard.element.removeChild(this.element);
        delete bountyBoard.bounties[this.name];
    }
    startTimer() {
        let intervalNum = setInterval(() => {
            if (this.isReady || this.timeRemaining == undefined) {
                clearInterval(intervalNum);
            }
            else if (this.timeRemaining <= 0) {
                clearInterval(intervalNum);
                this.setFailed();
            }
            else {
                this.timeRemaining--;
                this.updateTimeRemaining();
            }
        }, 1000);
    }
}

export function getBounties() {
    return bountyBoard.bounties;
}

export async function addBounty(key: string) {
    if (bountyBoard.bounties.length >= bountyLimit) {
        return;
    }

    let json = await jsonLoader.traverseJson(bountyJson, key);

    new Bounty(json, key);
}

export async function addRandomBounty(bountyCollection?: string) {
    if (!bountyCollection) {
        bountyCollection = "random";
    }
    let randomJson = (await bountyJson)[bountyCollection];
    let keys = Object.keys(randomJson);
    let pickedKey = keys[Math.floor(Math.random()*keys.length)];
    addBounty(`${bountyCollection}.${pickedKey}`);
}

export function checkAll() {
    bountyBoard.bounties.forEach(bounty => {
        bounty.updateStatus();
    });
}

export function updateBounties() {

}