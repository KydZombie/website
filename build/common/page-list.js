"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageList = void 0;
const jsonLoader = __importStar(require("./json-loader"));
const cursor = __importStar(require("./cursor"));
class PageList {
    constructor(jsonUrl, listContainer, infoText) {
        this.jsonUrl = jsonUrl;
        this.listContainer = listContainer;
        this.infoText = infoText;
        jsonLoader.getJson(jsonUrl).then(json => {
            this.pageJson = json;
            this.loadPageLists();
        }).then(() => {
            if (this.runAfter) {
                this.runAfter(pages);
            }
        });
    }
    loadPageLists() {
        if (!this.pageJson)
            return;
        let pageLists = Object.keys(this.pageJson);
        for (let pageListIndex = 0; pageListIndex < pageLists.length; pageListIndex++) {
            const list = pageLists[pageListIndex];
            pageListElements[pageListIndex] = this.loadPageList(list, pageListIndex == 0);
            this.listContainer.appendChild(pageListElements[pageListIndex]);
        }
        if (cursor) {
            cursor.addHoveringToAll(pages);
        }
        pages.forEach(page => {
            let pageData = page.dataset;
            if (pageData.description != null && this.infoText) {
                page.addEventListener("mouseenter", () => {
                    this.infoText.hidden = false;
                    this.infoText.innerHTML = `${page.innerHTML}: ${pageData.description}`;
                });
            }
            if (pageData.referenceList != null) {
                page.addEventListener("mouseenter", () => {
                    for (let i = 1; i < pageListElements.length; i++) {
                        const pageList = pageListElements[i];
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
        pages.push(pageElement);
        return pageElement;
    }
}
exports.PageList = PageList;
let pageListElements = [];
let pages = [];
