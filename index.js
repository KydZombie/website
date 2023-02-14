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

    page.addEventListener("mouseenter", () => {
      cursorBalls.forEach(ball => {
        ball.classList.add("hovering");
      });
    });
    page.addEventListener("mouseleave", () => {
      cursorBalls.forEach(ball => {
        ball.classList.remove("hovering");
      });
    });
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

getJson("pages.json").then(json => {
  pageJson = json;
  loadPageListContainer();
});

let BALL_COUNT = 20;
let BALL_SIZE = 15;
let cursorDiv = document.getElementById("cursor");
let cursorBalls = [];

cursorDiv.style.position = "fixed";

for (let i = 0; i < BALL_COUNT; i++) {
  let newBall = document.createElement("div");
  let size = BALL_SIZE - BALL_SIZE * (i / BALL_COUNT) + "px";
  newBall.classList.add("cursorball");
  newBall.style.left = 0;
  newBall.style.top = 0;
  newBall.style.width = size;
  newBall.style.height = size;
  cursorBalls[i] = newBall;
  cursorDiv.appendChild(newBall);
}

document.addEventListener("mousemove", e => {
  let ball = cursorBalls[0];
  ball.style.left = e.pageX + "px";
  ball.style.top = e.pageY + "px";
});

setInterval(() => {
  for (let i = BALL_COUNT - 1; i >= 0; i--) {
    let ball = cursorBalls[i];
    if (i != 0) {
      let nextBall = cursorBalls[i - 1];
      ball.style.left = nextBall.style.left;
      ball.style.top = nextBall.style.top;
    }
  }
}, 5);
