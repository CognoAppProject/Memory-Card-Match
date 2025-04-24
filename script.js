const allImages = ['apple.png','coconut.png', 'banana.png', 'grape.png', 'orange.png', 'kiwi.png', 'lemon.png', 'mango.png', 'pineapple.png','watermelon.png','strawberry.png'];
let level = 1;
let flippedCards = [];
let lockBoard = false;

function startGame() {
  document.getElementById('instruction-modal').style.display = 'none';
  loadLevel();
}

function nextLevel() {
    if (level >= allImages.length) {
      // Max level reached
      document.getElementById('next-level-btn').style.display = 'none';
      document.getElementById('final-screen').style.display = 'flex';
      return;
    }
  
    level++;
    document.getElementById('next-level-btn').style.display = 'none';
    loadLevel();
  }
  
  function restartGame() {
    level = 1;
    document.getElementById('final-screen').style.display = 'none';
    loadLevel();
  }
  

function loadLevel() {
  const board = document.getElementById('game-board');
  const levelDisplay = document.getElementById('level-display');
  board.innerHTML = '';
  flippedCards = [];
  lockBoard = false;
  levelDisplay.innerText = `Level: ${level}`;

  const pairs = level + 1;
  const selected = allImages.slice(0, pairs);
  const cards = shuffle([...selected, ...selected]);

  // Ensure symmetrical grid
  const columns = Math.ceil(Math.sqrt(cards.length));
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  cards.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = img;

    card.innerHTML = `
      <div class="front">?</div>
      <div class="back"><img src="images/${img}" alt="Card"></div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flip')) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
  } else {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }

  flippedCards = [];
  lockBoard = false;

  if (document.querySelectorAll('.card:not(.flip)').length === 0) {
    document.getElementById('next-level-btn').style.display = 'inline-block';
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
