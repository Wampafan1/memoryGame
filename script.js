const gameContainer = document.getElementById("game");
const cards = document.querySelectorAll('.card');
const startBtn = document.querySelector('#startButton');
const ReStartBtn = document.querySelector('#ReStartButton');
const colorPairs = document.querySelector('#game-size');
let matchedPairs = 0;
let score = 0;
let selectedCards = [];
let COLORS = 0;
ReStartBtn.style.display = 'none';
const savedBestScore = localStorage.getItem('score');
if (savedBestScore) {
  document.getElementById('bestScore').innerText = 'Best Score: ' + savedBestScore;
}

function randomRGB(){
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

function createColors(){
  let newColors = [];
  for(let i = 0; i<colorPairs.value; i++){
    let newColor = randomRGB();
    newColors.push(newColor);
    newColors.push(newColor);
  }
  console.log(newColors)
  return newColors
}

// const COLORS = [
//   "red",
//   "rgb(3,252,32)",
//   "rgb(3,252,32)",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

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
  if (selectedCards.length > 0 && (selectedCards[0].element === event.target )) {
    console.log('Same card clicked!');
    return; // Exit the function if the same card is clicked
} else if (selectedCards.length === 2) {
    console.log('More than 2 cards clicked!');
    return; // Exit the function if the same card is clicked
}

  // you can use event.target to see which element was clicked
  score++;
  let color = event.target.className;
  event.target.style.backgroundColor = color // Show the color of the card when clicked
  selectedCards.push({element: event.target, color: color});
  console.log("you just clicked", color);
  document.getElementById('score').innerText = 'Score: ' + score;
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
    matchedPairs++;  // Increment the matched pairs counter when a match is found
    // You can add any specific actions for the match case

    console.log(`Matched Pairs: ${matchedPairs} | COLORS.length: ${COLORS.length}`);
    // Check if the game is finished
    if (matchedPairs === COLORS.length / 2) {
      ReStartBtn.style.display = 'inline-block';
      alert('Game finished! All pairs have been matched.');
      lowScore(score);
      // Here you can also add code to show some kind of "game over" or "congratulations" message to the player
    }

  } else {
      console.log('No Match!');
      // Hide the colors again if they don't match, or another specific action
      cards[0].element.style.backgroundColor = '';
      cards[1].element.style.backgroundColor = '';

  }
}

function lowScore(score){
  let currentLowScore = parseInt(localStorage.getItem('score')) || 0;
  if (score < currentLowScore || currentLowScore === 0){
    localStorage.setItem('score', score.toString());
    document.getElementById('bestScore').innerText = 'Best Score: ' + score;
  }
}

startBtn.addEventListener('click', function(e){
  console.log('start game');
  COLORS = createColors();
  let shuffledColors = shuffle(COLORS);
  // when the DOM loads
  startBtn.style.display = 'none';
  createDivsForColors(shuffledColors);
})

ReStartBtn.addEventListener('click', function(e){
  console.log('restart game');
  matchedPairs = 0;
  score = 0;
  document.getElementById('score').innerText = 'Score: ' + score;
  gameContainer.innerHTML= '';
  ReStartBtn.style.display = 'none';
  COLORS = createColors();
  let shuffledColors = shuffle(COLORS);
  // when the DOM loads
  createDivsForColors(shuffledColors);
})

