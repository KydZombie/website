import * as state from "./state.js";
import * as translator from "../../common/translation.js";
import * as jsonLoader from "../../common/json-loader.js";

let bountyJson = jsonLoader.getJson("bounties.json");

let bountyLimit = 4;

let bountyHolder = document.getElementById("bounties");
let bountyList = [];


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

        bountyList[name] = this;
    }
    createBountyIcon(json) {
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        
        this.element = document.createElement("div");
        this.element.classList.add("bounty");
        this.element.dataset.bounty = this.name;

        let name = document.createElement("h1");
        te(name, atl(`bounty.${this.name}`));
        this.element.appendChild(name);

        this.addJsonPart(json.requirements, "requirement");
        this.addJsonPart(json.rewards, "reward");
        this.addJsonPart(json.punishments, "punishment");
        this.addJsonPart(json.timeLimit, "timeLimit");

        state.cursor.addHovering(this.element);
    }
    addJsonPart(part, partName) {
        if (!part) return;

        let atl = translator.asyncTranslate;
        let te = translator.translateElement;

        if (Object.keys(part).length == 0) {
            let oneShot = document.createElement("p");
            oneShot.classList.add(partName.toLowerCase());
            te(oneShot, atl(`ui.${partName}`), ": ", part);
            this.element.appendChild(oneShot);
            return;
        }

        let newPartText = document.createElement("p");
        te(newPartText, atl(`ui.${partName}`), ":");
        this.element.appendChild(newPartText);

        let newParts = JSON.parse(JSON.stringify(part));
        if (part.abstract) {
            part.abstract.forEach(key => {
                let requirement = document.createElement("p");
                requirement.classList.add("indented");
                te(requirement, atl(`requirement.${key}`));
                this.element.appendChild(requirement);
            });
            delete newParts.abstract;
        }
        Object.keys(newParts).forEach(key => {
            let requirement = document.createElement("p");
            requirement.classList.add("indented");
            if (key == "unlock") {
                te(requirement, atl(`ui.${key}`), ": ", atl(`unlock.${part[key]}`));
            }
            else {
                te(requirement, atl(key), ": ", part[key]);
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
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        te(this.element.getElementsByClassName("timelimit").item(0), atl("ui.timeLimit"), ": ", this.timeRemaining);
    }
    setReady() {
        this.isReady = true;

        this.element.classList.add("ready");
    }
    fail() {
        if (!this.name.includes("random")) {
            addBounty(this.name);
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
        delete bountyList[this.key];
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
    return bountyList;
}

export async function addBounty(key) {
    if (bountyList.length >= bountyLimit) {
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
    for (const key in bountyList) {
        if (Object.hasOwnProperty.call(bountyList, key)) {
            const bounty = bountyList[key];
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