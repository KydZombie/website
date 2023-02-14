const [backEl, showEl, hideEl, nextEl] = document.querySelectorAll(
  '#cardbuttons button'
);

showEl.addEventListener('click', showCardInfo);
hideEl.addEventListener('click', hideCardInfo);
backEl.addEventListener('click', backCard);
nextEl.addEventListener('click', nextCard);

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
  if (cards.length <= 1 || currentCardId >= cards.length - 1) {
    return;
  }

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

  if (currentCardId + 1 >= cards.length) {
    generateCards(5);
  }

  hideCardInfo();
}

function backCard() {
  if (cards.length == 0 || currentCardId == 0) return;

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

async function generateNewCard() {
  try {
    let response = await fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&prop=extracts&explaintext&origin=*");
    let data = await response.json();
    // Make card using this json
    let object = data.query.pages[Object.keys(data.query.pages)[0]];
    loadCard(object.title, formatExtract(object.extract));
  } catch (e) { console.log(e); }
}

function formatExtract(extract) {
  extract = extract.substring(0, extract.indexOf("\n"));
  if (extract.length > 128) {
    extract = extract.slice(0, 128);
    extract = extract + "..."
  }
  
  return extract;
}

async function generateCards(count) {
  if (count == 0) return;
  await generateNewCard();
  count--;
  await generateCards(count);
}

function start() {
  loadDeck();
  generateCards(9);
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
    clearTimeout(currentCard.timeout);
  }

  requestAnimationFrame(loop);
}

start();
