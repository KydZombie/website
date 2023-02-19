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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9wYWdlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEtBQUssTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFFBQVE7Q0FFYjtBQUVELE1BQU0sT0FBTyxRQUFRO0lBU25CLFlBQVksT0FBZSxFQUFFLGFBQTBCLEVBQUUsUUFBcUI7UUFMOUUscUJBQWdCLEdBQWtCLEVBQUUsQ0FBQztRQUNyQyxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUt4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxLQUFLLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRSxhQUFhLEdBQUcsU0FBUyxDQUFDLE1B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