import * as cursor from "../../common/cursor.js";
import * as translator from "../../common/translation.js";
import * as jsonLoader from "../../common/json-loader.js";

let bountyJson = jsonLoader.getJson("bounties.json");

let bountyHolder = document.getElementById("bounties");
let bounties = [];

class Bounty {
    constructor(json, key) {
        const {name, description, requirements, rewards, punishments, linkTo} = json;
        Object.assign(this, {name, description, requirements, rewards, punishments, linkTo});

        this.key = key;
        this.isReady = false;
        
        this.createBountyIcon(json);

        this.element.addEventListener("click", () => this.onClick());

        bountyHolder.appendChild(this.element);

        bounties[key] = this;
        // bounties.push(this);
    }
    createBountyIcon(json) {
        this.element = document.createElement("div");
        this.element.classList.add("bounty");
        this.element.dataset.bounty = this.key;
    
        let name = document.createElement("h1");
        name.innerHTML = json.name;
        this.element.appendChild(name);
    
        this.addJsonPart(json.requirements, "Requirements");
        this.addJsonPart(json.rewards, "Rewards");
        this.addJsonPart(json.punishments, "Punishments");
    
        cursor.addHovering(this.element);
    }
    addJsonPart(part, formattedText) {
        if (!part) return;
    
        let newPartText = document.createElement("p");
        newPartText.innerHTML = formattedText + ":";
        this.element.appendChild(newPartText);
        
        let newParts = JSON.parse(JSON.stringify(part));
        if (part.abstract) {
            part.abstract.forEach(key => {
                let requirement = document.createElement("p");
                requirement.style.paddingLeft = "8px";
                requirement.innerHTML = key;
                this.element.appendChild(requirement);
            })
            delete newParts.abstract;
        }
        Object.keys(newParts).forEach(key => {
            let requirement = document.createElement("p");
            requirement.style.paddingLeft = "8px";
            requirement.innerHTML = `${translator.translate(key)}: ${part[key]}`;
            this.element.appendChild(requirement);
        });
    }
    onClick() {
        if (this.isReady) {
            this.complete();
        }
        if (this.requirements.abstract) {
            this.requirements.abstract.forEach(bounty => {
                if (bounty == "click") {
                    this.setReady();
                }
            });
        }
    }
    complete() {
        if (this.linkTo) {
            addBounty(this.linkTo);
        }
        bountyHolder.removeChild(this.element);
        delete bounties[this.key];
    }
    isReady() {
        this.checkIsReady();
    }
    checkIsReady(state) {
        let tempIsReady = true;
        for (const type in this.requirements) {
            if (Object.hasOwnProperty.call(this.requirements, type)) {
                const amount = this.requirements[type];
                if (!isGlobalRequirementFulfilled(state, type, amount)) tempIsReady = false;
            }
        }
        this.isReady = tempIsReady || this.isReady;
        if (this.isReady) {
            this.element.classList.add("ready");
        }
    }
    setReady() {
        this.isReady = true;
    }
    fail() {

    }
}

export function getBounties() {
    return bounties;
}

export async function addBounty(key) {
    let directory = key.split(".").reverse();

    let currentObj = await bountyJson;
    while (directory.length > 0) {
        currentObj = currentObj[directory.pop()];
    }
    
    new Bounty(currentObj, key);
}

export function checkAll(state) {
    for (const key in bounties) {
        if (Object.hasOwnProperty.call(bounties, key)) {
            const bounty = bounties[key];
            bounty.checkIsReady(state);
        }
    }
}

function isGlobalRequirementFulfilled(state, type, amount) {
    if (amount) {
        if (state.obtained[type] >= amount) {
            return true;
        }
    }
    else {
        
    }
    return false;
}