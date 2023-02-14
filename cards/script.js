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
);

addEl.addEventListener('click', addCard);
removeEl.addEventListener('click', deleteCard);
saveEl.addEventListener('click', saveCards);
loadEl.addEventListener('click', loadCards);
clearEl.addEventListener('click', clearCards);
wipeEl.addEventListener('click', wipeStorage);

let title = document.getElementById('title');

const deck = document.getElementById('deck');

let cards, currentCardId, currentCard;
function loadDeck() {
  console.log('Loading deck');
  cards = deck.getElementsByClassName('card');
  if (!currentCardId || !cards.item(currentCardId)) {
    currentCardId = 0;
  }
  currentCard = cards.item(currentCardId);
  if (currentCard) currentCard.hidden = false;
}

function showCardInfo() {
  if (cards.length == 0) return;

  let info = currentCard.getElementsByClassName('cardinfo');
  info.item(0).classList.remove('blurred');
  let showButton = document.getElementById('show');
  showButton.hidden = true;
  let hideButton = document.getElementById('hide');
  hideButton.hidden = false;
}

function hideCardInfo() {
  if (cards.length == 0) return;

  let info = currentCard.getElementsByClassName('cardinfo');
  info.item(0).classList.add('blurred');
  let showButton = document.getElementById('show');
  showButton.hidden = false;
  let hideButton = document.getElementById('hide');
  hideButton.hidden = true;
}

function nextCard() {
  if (cards.length <= 1) return;

  let tempCard = currentCard;

  currentCard.classList.add("throwcard-right");
  currentCard.timeout = setTimeout(() => {
    tempCard.classList.remove("throwcard-right");
    tempCard.hidden = true;
  }, 1000);

  if (currentCardId < cards.length - 1) {
    currentCardId++;
  } else {
    currentCardId = 0;
  }

  currentCard = cards.item(currentCardId);
  currentCard.hidden = false;

  hideCardInfo();
}

function backCard() {
  if (cards.length == 0) return;

  let tempCard = currentCard;

  currentCard.classList.add("throwcard-left");
  currentCard.timeout = setTimeout(() => {
    tempCard.classList.remove("throwcard-left");
    tempCard.hidden = true;
  }, 1000);

  if (currentCardId > 0) {
    currentCardId--;
  } else {
    currentCardId = cards.length - 1;
  }

  currentCard = cards.item(currentCardId);
  currentCard.hidden = false;

  hideCardInfo();
}

function addCard() {
  let cardTitle = '';
  while (cardTitle == '') {
    cardTitle = prompt('Card title:');
    if (cardTitle == null) return;
  }
  let cardInfo = '';
  while (cardInfo == '') {
    cardInfo = prompt('Card description:');
    if (cardInfo == null) return;
  }

  loadCard(cardTitle, cardInfo);
}

function loadCard(cardTitle, cardInfo) {
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

  cards.item(currentCardId).remove();

  if (currentCardId >= cards.length) {
    currentCardId--;
  }

  loadDeck();
}

function clearCards() {
  while (cards.length > 0) {
    cards.item(0).remove();
  }
}

const buttonsMenu = document.getElementById('buttons');
const dataButtons = document.getElementById('databuttons');
const moreButton = document.getElementById('more');
const lessButton = document.getElementById('less');
const buttonsBackground = document.getElementById('buttonsbackground');
function showMore(show) {
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
  localStorage.setItem("cardCount", cards.length);

  for (let i = 0; i < cards.length; i++) {
    const card = cards.item(i);

    localStorage.setItem(`card${i}.title`, card.getElementsByClassName("cardtitle")[0].innerHTML);
    localStorage.setItem(`card${i}.info`, card.getElementsByClassName("cardinfo")[0].innerHTML);
  }
}

function loadCards() {
  if (typeof (Storage) == "undefined") {
    alert("Web Storage is not supported on this browser");
    return;
  }

  let cardCount = localStorage.getItem("cardCount");
  if (!cardCount) {
    alert("Could not load!")
    return;
  }

  clearCards();

  for (let i = 0; i < cardCount; i++) {
    const cardTitle = localStorage.getItem(`card${i}.title`);
    const cardInfo = localStorage.getItem(`card${i}.info`);

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

const cardCounter = document.getElementById("cardcounter");
function loop() {
  // if (cards.length > 0) {
  //   cardCounter.innerHTML = `Card: ${currentCardId + 1}/${cards.length}`;
  // }
  // else {
  //   cardCounter.innerHTML = "Card: N/A";
  // }

  if (currentCard.classList.contains("throwcard") || currentCard.hidden) {
    currentCard.classList.remove("throwcard");
    currentCard.hidden = false;
  }
  requestAnimationFrame(loop);
}

start();
