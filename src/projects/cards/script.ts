import * as cursor from "../../common/cursor.js";

// TODO Convert properly to TS
const [backEl, showEl, hideEl, nextEl, moreEl, lessEl] = document.querySelectorAll(
  '#cardbuttons button'
);

showEl.addEventListener('click', showCardInfo);
hideEl.addEventListener('click', hideCardInfo);
backEl.addEventListener('click', backCard);
nextEl.addEventListener('click', nextCard);
moreEl.addEventListener('click', () => showMore(true));
lessEl.addEventListener('click', () => showMore(false));

const [addEl, removeEl, saveEl, loadEl, clearEl, wipeEl] = document.querySelectorAll(
  '#databuttons button'
) as any;

addEl.addEventListener('click', addCard);
removeEl.addEventListener('click', deleteCard);
saveEl.addEventListener('click', saveCards);
loadEl.addEventListener('click', loadCards);
clearEl.addEventListener('click', clearCards);
wipeEl.addEventListener('click', wipeStorage);

cursor.addHoveringToAll([backEl, showEl, hideEl, nextEl, moreEl, lessEl, addEl, removeEl, saveEl, loadEl, clearEl, wipeEl]);

const deck = document.getElementById('deck')!;

let cards: HTMLCollectionOf<Element>;
let currentCardId: number
let currentCard: HTMLElement | null;
function loadDeck() {
  console.log('Loading deck');
  cards = deck.getElementsByClassName('card');
  if (!currentCardId || !cards.item(currentCardId)) {
    currentCardId = 0;
  }
  currentCard = cards.item(currentCardId) as HTMLElement;
  if (currentCard != null) currentCard.hidden = false;
}

function showCardInfo() {
  if (cards.length == 0 || currentCard == null) return;

  let info = currentCard.getElementsByClassName('cardinfo')!;
  info.item(0)!.classList.remove('blurred');
  let showButton = document.getElementById('show') as HTMLElement;
  showButton.hidden = true;
  let hideButton = document.getElementById('hide') as HTMLElement;
  hideButton.hidden = false;
}

function hideCardInfo() {
  if (cards.length == 0 || currentCard == null) return;

  let info = currentCard.getElementsByClassName('cardinfo');
  info.item(0)!.classList.add('blurred');
  let showButton = document.getElementById('show') as HTMLElement;
  showButton.hidden = false;
  let hideButton = document.getElementById('hide') as HTMLElement;
  hideButton.hidden = true;
}

function nextCard() {
  if (cards.length <= 1 || currentCard == null) return;

  let tempCard = currentCard;

  currentCard.classList.add("throwcard-right");
  setTimeout(() => {
    tempCard.classList.remove("throwcard-right");
    tempCard.hidden = true;
  }, 1000);

  if (currentCardId < cards.length - 1) {
    currentCardId++;
  } else {
    currentCardId = 0;
  }

  currentCard = cards.item(currentCardId) as HTMLElement;
  currentCard.hidden = false;

  hideCardInfo();
}

function backCard() {
  if (cards.length == 0 || currentCard == null) return;

  let tempCard = currentCard;

  currentCard.classList.add("throwcard-left");
  setTimeout(() => {
    tempCard.classList.remove("throwcard-left");
    tempCard.hidden = true;
  }, 1000);

  if (currentCardId > 0) {
    currentCardId--;
  } else {
    currentCardId = cards.length - 1;
  }

  currentCard = cards.item(currentCardId) as HTMLElement;
  currentCard.hidden = false;

  hideCardInfo();
}

function addCard() {
  let cardTitle = '' as string | null;
  while (cardTitle == '') {
    cardTitle = prompt('Card title:');
    if (cardTitle == null) return;
  }
  let cardInfo = '' as string | null;
  while (cardInfo == '') {
    cardInfo = prompt('Card description:');
    if (cardInfo == null) return;
  }

  loadCard(cardTitle!, cardInfo!);
}

function loadCard(cardTitle: string, cardInfo: string) {
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.hidden = true;
  let titleElement = document.createElement('p');
  titleElement.innerHTML = cardTitle;
  titleElement.classList.add('cardtitle');
  let infoElement = document.createElement('p');
  infoElement.innerHTML = cardInfo;
  infoElement.classList.add('cardinfo');
  infoElement.classList.add('blurred');

  newCard.appendChild(titleElement);
  newCard.appendChild(infoElement);

  console.log(`Created new card:\n  Title: ${cardTitle}\n  Info: ${cardInfo}`);

  deck.appendChild(newCard);

  loadDeck();
}

function deleteCard() {
  if (cards.length == 0) return;

  console.log('Deleting card');

  cards.item(currentCardId)!.remove();

  if (currentCardId >= cards.length) {
    currentCardId--;
  }

  loadDeck();
}

function clearCards() {
  while (cards.length > 0) {
    cards.item(0)!.remove();
  }
}

const buttonsMenu = document.getElementById('buttons')!;
const dataButtons = document.getElementById('databuttons')!;
const moreButton = document.getElementById('more')!;
const lessButton = document.getElementById('less')!;
function showMore(show: boolean) {
  if (show) {
    buttonsMenu.classList.add('extended');
    setTimeout(() => {
      dataButtons.classList.add('visible');
      moreButton.hidden = true;
      lessButton.hidden = false;
    }, 250);
  } else {
    buttonsMenu.classList.remove('extended');
    moreButton.hidden = false;
    lessButton.hidden = true;
    setTimeout(() => {
      dataButtons.classList.remove('visible');
    }, 250);
  }
}

function saveCards() {
  if (typeof (Storage) == "undefined") {
    alert("Web Storage is not supported on this browser");
    return;
  }

  localStorage.clear();
  localStorage.setItem("cardCount", cards.length.toString());

  for (let i = 0; i < cards.length; i++) {
    const card = cards.item(i);

    localStorage.setItem(`card${i}.title`, card!.getElementsByClassName("cardtitle")[0].innerHTML);
    localStorage.setItem(`card${i}.info`, card!.getElementsByClassName("cardinfo")[0].innerHTML);
  }
}

function loadCards() {
  if (typeof (Storage) == "undefined") {
    alert("Web Storage is not supported on this browser");
    return;
  }

  let cardCount;
  let unparsedCardCount = localStorage.getItem("cardCount");
  if (unparsedCardCount != null) {
    cardCount = parseInt(unparsedCardCount);
  } else {
    alert("Could not load!")
    return;
  }

  clearCards();

  for (let i = 0; i < cardCount; i++) {
    const cardTitle = localStorage.getItem(`card${i}.title`);
    const cardInfo = localStorage.getItem(`card${i}.info`);
    if (cardTitle == null || cardInfo == null) continue;
    loadCard(cardTitle, cardInfo);
  }
}

function wipeStorage() {
  localStorage.clear();
}

function start() {
  loadDeck();
  requestAnimationFrame(loop);
}

const cardCounter = document.getElementById("cardcounter")!;
function loop() {
  if (cards.length > 0) {
    cardCounter.innerHTML = `Card: ${currentCardId + 1}/${cards.length}`;
  }
  else {
    cardCounter.innerHTML = "Card: N/A";
  }

  if (currentCard != null && (currentCard.classList.contains("throwcard") || currentCard.hidden)) {
    currentCard.classList.remove("throwcard");
    currentCard.hidden = false;
  }
  requestAnimationFrame(loop);
}

start();
