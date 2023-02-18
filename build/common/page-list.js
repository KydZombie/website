import * as jsonLoader from "./json-loader.js";
import * as cursor from "./cursor.js";
class PageJson {
}
export class PageList {
    constructor(jsonUrl, listContainer, infoText) {
        this.pageListElements = [];
        this.pages = [];
        this.jsonUrl = jsonUrl;
        this.listContainer = listContainer;
        this.infoText = infoText;
        jsonLoader.getJson(jsonUrl).then(json => {
            this.pageJson = json;
            this.loadPageLists();
        }).then(() => {
            if (this.runAfter) {
                this.runAfter(this.pages);
            }
        });
    }
    loadPageLists() {
        if (!this.pageJson)
            return;
        let pageLists = Object.keys(this.pageJson);
        for (let pageListIndex = 0; pageListIndex < pageLists.length; pageListIndex++) {
            const list = pageLists[pageListIndex];
            this.pageListElements[pageListIndex] = this.loadPageList(list, pageListIndex == 0);
            this.listContainer.appendChild(this.pageListElements[pageListIndex]);
        }
        if (cursor) {
            cursor.addHoveringToAll(this.pages);
        }
        this.pages.forEach(page => {
            let pageData = page.dataset;
            if (pageData.description != null && this.infoText) {
                page.addEventListener("mouseenter", () => {
                    this.infoText.hidden = false;
                    this.infoText.innerHTML = `${page.innerHTML}: ${pageData.description}`;
                });
            }
            if (pageData.referenceList != null) {
                page.addEventListener("mouseenter", () => {
                    for (let i = 1; i < this.pageListElements.length; i++) {
                        const pageList = this.pageListElements[i];
                        if (pageList.id == pageData.referenceList) {
                            pageList.hidden = false;
                        }
                        else {
                            pageList.hidden = true;
                        }
                    }
                });
            }
            if (page.dataset["onClick"]) {
                page.classList.add("clickable");
                page.addEventListener("click", () => eval(page.dataset["onClick"]));
            }
        });
    }
    loadPageList(listKey, isMain) {
        if (!this.pageJson)
            return;
        let listElement = document.createElement("div");
        listElement.id = listKey;
        listElement.classList.add("pagelist");
        if (!isMain)
            listElement.hidden = true;
        let pageItemIndexes = Object.keys(this.pageJson[listKey]);
        pageItemIndexes.forEach(page => {
            listElement.appendChild(this.loadPage(listKey, page));
        });
        return listElement;
    }
    loadPage(listKey, pageKey) {
        if (!this.pageJson)
            return;
        let keys = Object.keys(this.pageJson[listKey][pageKey]);
        let pageElement;
        if (keys.includes("link")) {
            pageElement = document.createElement("a");
            pageElement.href = this.pageJson[listKey][pageKey]["link"];
            pageElement.classList.add("clickable");
        }
        else {
            pageElement = document.createElement("p");
        }
        pageElement.innerHTML = pageKey;
        pageElement.classList.add("page");
        keys.forEach(key => {
            if (key != "link") {
                pageElement.dataset[key] = this.pageJson[listKey][pageKey][key];
            }
        });
        this.pages.push(pageElement);
        return pageElement;
    }
}
