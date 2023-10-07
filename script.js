const gameContainer = document.getElementById("game");
const cards = document.querySelectorAll('.card');
let selectedCards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Check if the same card is clicked twice
  if (selectedCards.length > 0 && (selectedCards[0].element === event.target ||  selectedCards.length === 2)) {
    console.log('Same card clicked OR more than 2 cards clicked!');
    return; // Exit the function if the same card is clicked
}

  // you can use event.target to see which element was clicked
  
  let color = event.target.className;
  event.target.style.backgroundColor = color // Show the color of the card when clicked
  selectedCards.push({element: event.target, color: color});
  console.log("you just clicked", color);

  if (selectedCards.length === 2) {
    cards.forEach(card => {
      card.classList.add('no-click');
    });

    setTimeout(() => {
        compareCards(selectedCards);
        selectedCards = []; // Reset the selected cards array after comparison

        cards.forEach(card => {
          card.classList.remove('no-click');
      });
    }, 1000); // Adjust timeout as needed
  }
}

function compareCards(cards) {
  if (cards[0].color === cards[1].color) {
      console.log('Match!');
      // You can add any specific actions for the match case
  } else {
      console.log('No Match!');
      // Hide the colors again if they don't match, or another specific action
      cards[0].element.style.backgroundColor = '';
      cards[1].element.style.backgroundColor = '';
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
