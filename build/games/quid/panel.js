import * as jsonLoader from "../../common/json-loader.js";
import * as translator from "../../common/translation.js";
import * as cursor from "../../common/cursor.js";
let panel = document.getElementById("panel");
const bountyLimit = 4;
let bountyJson = jsonLoader.getJson("bounties.json");
let bountyBoard = {
    element: document.getElementById("bounties"),
    bounties: new Map()
};
export class Bounty {
    constructor(json, name) {
        this.element = document.createElement("div");
        this.accepted = false;
        this.isReady = false;
        this.failed = false;
        this.name = name;
        this.description = json.description;
        // this.punishments = json.punishments;
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
        bountyBoard.element.appendChild(this.element);
        bountyBoard.bounties.set(name, this);
    }
    createBountyIcon(json) {
        let atl = translator.asyncTranslate;
        let te = translator.translateElement;
        // this.element = document.createElement("div");
        this.addJsonPart(json.requirements, "requirement", {});
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
    }
    accept() {
        this.accepted = true;
        this.element.classList.add("accepted");
        // if (this.timeLimit) this.startTimer();
    }
    complete() {
        if (this.linkTo) {
            // addBounty(this.linkTo);
        }
        if (this.otherData.endTutorial) {
            // addRandomBounty();
        }
        this.dismiss();
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
            // addBounty(this.name);
        }
        // if (this.punishments != undefined) {
        //     for (const punishment of this.punishments) {
        //         punishment.punish();
        //     }
        // }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2FtZXMvcXVpZC9wYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssVUFBVSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sS0FBSyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxLQUFLLE1BQU0sTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBRSxDQUFDO0FBQzlDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUV0QixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBSXJELElBQUksV0FBVyxHQUFHO0lBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFFO0lBQzdDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBa0I7Q0FDdEMsQ0FBQTtBQUVELE1BQU0sT0FBTyxNQUFNO0lBZ0JmLFlBQVksSUFBMkIsRUFBRSxJQUFZO1FBUHJELFlBQU8sR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUl0RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFaEMsSUFB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