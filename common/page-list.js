import * as jsonLoader from "/common/json-loader.js";

let pageJson;

let pageListElements = [];
let pages = [];

let pageListContainer;

let infoText = document.getElementById("infopanel");

export function grabPageLists(url, parent, runAfter) {
  pageListContainer = parent;
  jsonLoader.getJson(url).then(json => {
    pageJson = json;
    loadPageLists();
  }).then(() => {
    if (runAfter) {
      runAfter(pages);
    }
  });
}


function loadPageLists() {
  let pageLists = Object.keys(pageJson);

  for (let pageListIndex = 0; pageListIndex < pageLists.length; pageListIndex++) {
    const list = pageLists[pageListIndex];
    pageListElements[pageListIndex] = loadPageList(list, pageListIndex == 0);
    pageListContainer.appendChild(pageListElements[pageListIndex]);
  }

  pages.forEach(page => {
    let pageData = page.dataset;
    if (pageData.description != null && infoText) {
      page.addEventListener("mouseenter", () => {
        infoText.hidden = false;
        infoText.innerHTML = `${page.innerHTML}: ${pageData.description}`;
      });
    }
    if (pageData.referenceList != null) {
      page.addEventListener("mouseenter", () => {
        for (let i = 1; i < pageListElements.length; i++) {
          const pageList = pageListElements[i];
          if (pageList.id == pageData.referenceList) {
            pageList.hidden = false;
          } else {
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

function loadPageList(listKey, isMain) {
  let listElement = document.createElement("div");

  listElement.id = listKey;
  listElement.classList.add("pagelist");

  if (!isMain) listElement.hidden = true;

  let pageItemIndexes = Object.keys(pageJson[listKey]);
  pageItemIndexes.forEach(page => {
    listElement.appendChild(loadPage(listKey, page));
  });
  return listElement;
}

function loadPage(listKey, pageKey) {
  let keys = Object.keys(pageJson[listKey][pageKey]);

  let pageElement;
  if (keys.includes("link")) {
    pageElement = document.createElement("a");
    pageElement.href = pageJson[listKey][pageKey]["link"];
    pageElement.classList.add("clickable");
  } else {
    pageElement = document.createElement("p");
  }

  pageElement.innerHTML = pageKey;
  pageElement.classList.add("page");

  keys.forEach(key => {
    if (key != "link") {
      pageElement.dataset[key] = pageJson[listKey][pageKey][key];
    }
  })
  pages.push(pageElement);
  return pageElement;
}