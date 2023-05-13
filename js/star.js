// js/star.js
function toggleCard(card) {
    card.classList.toggle('flipped');
}

const cardContainer = document.querySelector('.card-container');

function setCardSize() {
  cardContainer.style.width = `${window.innerWidth}px`;
  cardContainer.style.height = `${window.innerHeight}px`;
}

window.addEventListener('resize', setCardSize);
setCardSize();


