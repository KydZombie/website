let pageListContainer = document.getElementById("pagelistcontainer");
let infoText = document.getElementById("infopanel");

let pageListElements = [];
let pageJson;
let pages = [];

async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function loadPageListContainer() {
  let pageLists = Object.keys(pageJson);

  for (let pageListIndex = 0; pageListIndex < pageLists.length; pageListIndex++) {
    const list = pageLists[pageListIndex];
    pageListElements[pageListIndex] = loadPageList(list, pageListIndex == 0);
    pageListContainer.appendChild(pageListElements[pageListIndex]);
  }

  pages.forEach(page => {
    let pageData = page.dataset;
    if (pageData.description != null) {
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
            pageList.style = "display: flex";
          } else {
            pageList.style = "display: none";
          }
        }
      });
    }
  });
}

function loadPageList(listKey, isMain) {
  let listElement = document.createElement("div");

  listElement.id = listKey;
  listElement.classList.add("pagelist");

  if (!isMain) listElement.style = "display: none";

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

getJson("pages.json").then(json => {
  pageJson = json;
  loadPageListContainer();
});