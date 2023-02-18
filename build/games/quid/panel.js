var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsonLoader from "../../common/json-loader.js";
import * as translator from "../../common/translation.js";
import * as cursor from "../../common/cursor.js";
let panel = document.getElementById("panel");
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
    element: document.getElementById("bounties"),
    bounties: new Map()
};
class Requirement {
    constructor() {
        this.element = document.createElement("p");
        this.fulfilled = false;
    }
    addToBoard(bountyElement) {
        this.updateElementText();
        bountyElement.append(this.element);
    }
    fulfill() {
        this.fulfilled = true;
    }
    isFulfilled() {
        if (this.fulfilled)
            return true;
        return this.checkFulfilled();
    }
}
class ItemRequirement extends Requirement {
    constructor(type, amount) {
        super();
        this.type = type;
        this.amount = amount;
    }
    static serialize(value) {
    }
    updateElementText() {
        translator.translateElement(this.element, translator.asyncTranslate(`item.${this.type}`), ": ", this.amount.toString());
    }
    checkFulfilled() {
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
class Reward {
    constructor() {
        this.element = document.createElement("p");
    }
    serialize() {
        throw new Error("Method not implemented.");
    }
    addToBoard(sourceElement) {
        this.updateElementText();
        sourceElement.append(this.element);
    }
}
class QuidReward extends Reward {
    constructor(amount) {
        super();
        this.amount = amount;
    }
    updateElementText() {
        translator.translateElement(this.element, translator.asyncTranslate(`item.quid`), ": ", this.amount.toString());
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
class Punishment {
    constructor() {
        this.element = document.createElement("p");
    }
    serialize() {
        throw new Error("Method not implemented.");
    }
    addToBoard(sourceElement) {
        this.updateElementText();
        sourceElement.append(this.element);
    }
}
class QuidPunishment extends Punishment {
    constructor(loss) {
        super();
        this.loss = loss;
    }
    updateElementText() {
        translator.translateElement(this.element, translator.asyncTranslate(`item.quid`), ": ", this.loss.toString());
        this.element.appendChild(this.element);
    }
    punish() {
        console.log(`Would have taken ${this.loss} Quid`);
    }
}
export class Bounty {
    constructor(json, name) {
        this.element = document.createElement("div");
        this.accepted = false;
        this.isReady = false;
        this.failed = false;
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
        bountyBoard.bounties.set(name, this);
    }
    createBountyIcon(json) {
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        // this.element = document.createElement("div");
        this.element.classList.add("bounty");
        this.element.dataset.bounty = this.name;
        let name = document.createElement("h1");
        te(name, atl(`bounty.${this.name}`));
        this.element.appendChild(name);
        this.addJsonPart(json.requirements, "requirement", {
            "item": ItemRequirement.serialize,
        });
        this.addJsonPart(json.rewards, "reward", {});
        this.addJsonPart(json.punishments, "punishment", {});
        this.addJsonPart(json.timeLimit, "timeLimit", {});
        cursor.addHovering(this.element);
    }
    addJsonPart(categoryData, categoryName, bountyObjects) {
        if (!categoryData)
            return;
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        let newPartText = document.createElement("p");
        te(newPartText, atl(`ui.${categoryName}`), ":");
        this.element.appendChild(newPartText);
        // let keys = Object.keys(categoryData);
        for (const name in categoryData) {
            if (Object.prototype.hasOwnProperty.call(categoryData, name)) {
                const value = categoryData[name];
                let paths = name.split('.');
                if (paths[0] == "abstract") {
                }
                else {
                    bountyObjects[paths[0]](value);
                }
            }
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
        if (this.timeLimit)
            this.startTimer();
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
        let timeLimitElement = this.element.getElementsByClassName("timelimit").item(0);
        te(timeLimitElement, atl("ui.timeLimit"), ": ", this.timeRemaining.toString());
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
                punishment.punish();
            }
        }
        this.dismiss();
    }
    setFailed() {
        this.failed = true;
        this.element.classList.add("failed");
    }
    dismiss() {
        bountyBoard.element.removeChild(this.element);
        bountyBoard.bounties.delete(this.name);
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
export function addBounty(key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bountyBoard.bounties.size >= bountyLimit) {
            return;
        }
        let json = yield jsonLoader.traverseJson(bountyJson, key);
        new Bounty(json, key);
    });
}
export function addRandomBounty(bountyCollection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bountyCollection) {
            bountyCollection = "random";
        }
        let randomJson = (yield bountyJson)[bountyCollection];
        let keys = Object.keys(randomJson);
        let pickedKey = keys[Math.floor(Math.random() * keys.length)];
        addBounty(`${bountyCollection}.${pickedKey}`);
    });
}
export function checkAll() {
    bountyBoard.bounties.forEach((bounty) => {
        bounty.updateStatus();
    });
}
export function updateBounties() {
}
