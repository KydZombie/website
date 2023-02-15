import * as jsonLoader from "/common/json-loader.js";

let pageListElements = [];
let pages = [];

let settings;

let cursor;

export function grabPageLists(settingsPassed) {
  settings = settingsPassed;
  if (!settings.jsonUrl) {
    settings.jsonUrl =  "pages.json";
  }
  if (!settings.listContainer) {
    settings.listContainer = document.getElementById("pagelistcontainer");
  }
  if (!settings.infoText) {
    settings.infoText = document.getElementById("infopanel");
  }
  if (settings.cursor) {
    cursor = settings.cursor;
  }
  jsonLoader.getJson(settings.jsonUrl).then(json => {
    settings.pageJson = json;
    loadPageLists();
  }).then(() => {
    if (settings.runAfter) {
      settings.runAfter(pages);
    }
  });
}


function loadPageLists() {
  let pageLists = Object.keys(settings.pageJson);

  for (let pageListIndex = 0; pageListIndex < pageLists.length; pageListIndex++) {
    const list = pageLists[pageListIndex];
    pageListElements[pageListIndex] = loadPageList(list, pageListIndex == 0);
    settings.listContainer.appendChild(pageListElements[pageListIndex]);
  }

  if (cursor) {
    cursor.addHoveringToAll(pages);
  }

  pages.forEach(page => {
    let pageData = page.dataset;
    if (pageData.description != null && settings.infoText) {
      page.addEventListener("mouseenter", () => {
        settings.infoText.hidden = false;
        settings.infoText.innerHTML = `${page.innerHTML}: ${pageData.description}`;
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

  let pageItemIndexes = Object.keys(settings.pageJson[listKey]);
  pageItemIndexes.forEach(page => {
    listElement.appendChild(loadPage(listKey, page));
  });
  return listElement;
}

function loadPage(listKey, pageKey) {
  let keys = Object.keys(settings.pageJson[listKey][pageKey]);

  let pageElement;
  if (keys.includes("link")) {
    pageElement = document.createElement("a");
    pageElement.href = settings.pageJson[listKey][pageKey]["link"];
    pageElement.classList.add("clickable");
  } else {
    pageElement = document.createElement("p");
  }

  pageElement.innerHTML = pageKey;
  pageElement.classList.add("page");

  keys.forEach(key => {
    if (key != "link") {
      pageElement.dataset[key] = settings.pageJson[listKey][pageKey][key];
    }
  })
  pages.push(pageElement);
  return pageElement;
}