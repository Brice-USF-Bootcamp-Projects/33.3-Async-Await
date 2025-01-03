let deckId = null;

// Function to fetch a new deck
async function fetchNewDeck() {
  try {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
    const data = await response.json();
    deckId = data.deck_id;
    console.log(`Deck ID: ${deckId}`);
  } catch (error) {
    console.error('Error fetching a new deck:', error);
  }
}

// Function to draw a card
async function drawCard() {
  if (!deckId) {
    console.error('No deck ID available.');
    return;
  }

  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();

    if (data.remaining === 0) {
      document.getElementById('draw-card').disabled = true;
      alert('No more cards in the deck!');
      return;
    }

    const card = data.cards[0];
    const cardDiv = document.getElementById('cards');

    // Create an image element for the card
    const cardImg = document.createElement('img');
    cardImg.src = card.image;
    cardImg.alt = `${card.value} of ${card.suit}`;

    // Apply custom styles for greater rotation and stacking
    const randomRotation = Math.random() * 60 - 30; // Random rotation between -30 and 30 degrees
    cardImg.style.transform = `rotate(${randomRotation}deg)`;
    cardImg.style.position = 'absolute'; // Stack the cards
    cardImg.style.top = '0';
    cardImg.style.left = '0';

    // Append the card to the container
    cardDiv.appendChild(cardImg);

    console.log(`${card.value} of ${card.suit}`);
  } catch (error) {
    console.error('Error drawing a card:', error);
  }
}

// Event listener for the draw card button
document.getElementById('draw-card').addEventListener('click', drawCard);

// Fetch a new deck when the page loads
fetchNewDeck();
