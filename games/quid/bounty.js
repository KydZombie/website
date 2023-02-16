import * as translator from "../../common/translation.js";
import * as jsonLoader from "../../common/json-loader.js";

let bountyJson = jsonLoader.getJson("bounties.json");

let bountyLimit = 4;

let bountyHolder = document.getElementById("bounties");
let bounties = [];

let state;

class Bounty {
    constructor(json, name) {
        const { description, requirements, rewards, punishments, linkTo, timeLimit, otherData } = json;
        Object.assign(this, { description, requirements, rewards, punishments, linkTo, timeLimit, otherData });

        if (!this.otherData) {
            this.otherData = {};
        }

        this.name = name;
        this.accepted = false;
        this.failed = false;
        this.isReady = false;

        if (this.timeLimit) {
            this.timeRemaining = this.timeLimit;
        }

        this.createBountyIcon(json);

        this.element.addEventListener("click", () => this.onClick());

        bountyHolder.appendChild(this.element);

        bounties[name] = this;
    }
    createBountyIcon(json) {
        this.element = document.createElement("div");
        this.element.classList.add("bounty");
        this.element.dataset.bounty = this.name;

        let name = document.createElement("h1");
        translator.translateElement(name, "bounty." + this.name);
        this.element.appendChild(name);

        this.addJsonPart(json.requirements, "requirement");
        this.addJsonPart(json.rewards, "reward");
        this.addJsonPart(json.punishments, "punishment");
        this.addJsonPart(json.timeLimit, "timeLimit");

        state.cursor.addHovering(this.element);
    }
    addJsonPart(part, partName) {
        if (!part) return;

        if (Object.keys(part).length == 0) {
            let oneShot = document.createElement("p");
            oneShot.classList.add(partName.toLowerCase());
            translator.translateElement(oneShot, `ui.${partName}`, " " + part);
            this.element.appendChild(oneShot);
            return;
        }

        let newPartText = document.createElement("p");
        translator.translateElement(newPartText, `ui.${partName}`);
        this.element.appendChild(newPartText);

        let newParts = JSON.parse(JSON.stringify(part));
        if (part.abstract) {
            part.abstract.forEach(key => {
                let requirement = document.createElement("p");
                requirement.classList.add("indented");
                translator.translateElement(requirement, `requirement.${key}`);
                this.element.appendChild(requirement);
            });
            delete newParts.abstract;
        }
        Object.keys(newParts).forEach(key => {
            let requirement = document.createElement("p");
            requirement.classList.add("indented");
            if (key == "unlock") {
                translator.translateElement(requirement, `ui.${key}`, ": " + part[key]);
            }
            else {
                translator.translateElement(requirement, `${key}`, ": " + part[key]);
            }
            this.element.appendChild(requirement);
        });
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

            if (this.requirements.abstract) {
                this.requirements.abstract.forEach(bounty => {
                    if (bounty == "click") {
                        this.setReady();
                    }
                });
            }

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
        for (const type in this.requirements) {
            if (Object.hasOwnProperty.call(this.requirements, type)) {
                const amount = this.requirements[type];
                if (!isGlobalRequirementFulfilled(type, amount)) tempIsReady = false;
            }
        }
        this.isReady = tempIsReady || this.isReady;
    }
    updateTimeRemaining() {
        translator.translateElement(this.element.getElementsByClassName("timelimit").item(0), "ui.timeLimit", " " + this.timeRemaining);
        // this.element.getElementsByClassName("timelimit").item(0)
        //     .innerHTML = `${translator.translate("timeLimit")} ${this.timeRemaining}`;
    }
    setReady() {
        this.isReady = true;

        this.element.classList.add("ready");
    }
    fail() {
        if (!this.key.includes("random")) {
            addBounty(this.key);
        }
        for (const punishment in this.punishments) {
            if (Object.hasOwnProperty.call(this.punishments, punishment)) {
                const amount = this.punishments[punishment];
                state.loseQuid(amount);
            }
        }
        this.dismiss();
    }
    setFailed() {
        this.failed = true

        this.element.classList.add("failed");
    }
    dismiss() {
        bountyHolder.removeChild(this.element);
        delete bounties[this.key];
    }
    startTimer() {
        let intervalNum = setInterval(() => {
            if (this.isReady) {
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
    return bounties;
}

export async function addBounty(key) {
    if (bounties.length >= bountyLimit) {
        return;
    }

    let json = await jsonLoader.traverseJson(bountyJson, key);

    new Bounty(json, key);
}

export async function addRandomBounty(bountyCollection) {
    if (!bountyCollection) {
        bountyCollection = "random";
    }
    let randomJson = (await bountyJson)[bountyCollection];
    let keys = Object.keys(randomJson);
    let pickedKey = keys[Math.floor(Math.random()*keys.length)];
    addBounty(`${bountyCollection}.${pickedKey}`);
}

export function checkAll() {
    for (const key in bounties) {
        if (Object.hasOwnProperty.call(bounties, key)) {
            const bounty = bounties[key];
            bounty.updateStatus();
        }
    }
}

function isGlobalRequirementFulfilled(type, amount) {
    if (amount) {
        if (state.obtained[type] >= amount) {
            return true;
        }
    }
    else {

    }
    return false;
}

export function setState(newState) {
    state = newState;
}