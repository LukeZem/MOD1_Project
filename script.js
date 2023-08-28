const gameBoard = document.querySelector(".game-board");
const controls = document.querySelectorAll(".key-controls div");

let foodX = 13,
  foodY = 10;

let snakeX = 15,
  snakeY = 15;

let speedX = 0,
  speedY = 0;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);

  // Recursively change food position if it starts the same as the snake head
  if (foodX === snakeX && foodY === snakeY) {
    changeFoodPosition();
  }
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp") {
    speedX = 0;
    speedY = -1;
  } else if (e.key === "ArrowDown") {
    speedX = 0;
    speedY = 1;
  } else if (e.key === "ArrowRight") {
    speedX = 1;
    speedY = 0;
  } else if (e.key === "ArrowLeft") {
    speedX = -1;
    speedY = 0;
  }
};

controls.forEach((key) => {
  key.addEventListener("click", () => {
    const keyCode = key.getAttribute("data-key");
    changeDirection({ key: keyCode }); // Simulate the event object for changeDirection
  });
});

const initGame = () => {
  // Move the snake head based on speed
  snakeX += speedX;
  snakeY += speedY;

  // Check for collisions or edge cases here...

  // Create the HTML markup for the snake head and food
  let htmlMarkup = `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  htmlMarkup += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Update the game board with the new markup
  gameBoard.innerHTML = htmlMarkup;

  // Repeat the game loop using setTimeout for a slower speed
  setTimeout(initGame, 200); // delay in milliseconds
};

// Randomize food position and start the game loop
changeFoodPosition();
initGame();

// Listen for keyboard input
document.addEventListener("keydown", changeDirection);
