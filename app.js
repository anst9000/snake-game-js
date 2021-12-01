/*
  Create by Learn Web Developement
  Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

// Declare all variables
//============================================
// canvas, context and game
let cvs
let ctx
let game

// images
let ground = new Image()
let foodImg = new Image()

// audio
let dead = new Audio()
let eat = new Audio()
let up = new Audio()
let right = new Audio()
let left = new Audio()
let down = new Audio()
//============================================

// create the unit
const box = 32;

// load images
const loadImages = () => {
  ground.src = "img/ground.png";
  foodImg.src = "img/food.png";
}

// load audio files
const loadAudio = () => {
  dead.src = "audio/dead.mp3";
  eat.src = "audio/eat.mp3";
  up.src = "audio/up.mp3";
  right.src = "audio/right.mp3";
  left.src = "audio/left.mp3";
  down.src = "audio/down.mp3";
}

// create the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var
let score = 0;

//control the snake
let d;

const addEventListeners = () => {
  document.addEventListener("keydown", direction);
}

const direction = (event) => {
  let key = event.keyCode;

  if ( key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

// cheack collision function
const collision = (head, array) => {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }

  return false;
}

// draw everything to the canvas
const draw = () => {
  ctx.drawImage(ground,0,0);

  for( let i = 0; i < snake.length ; i++){
    ctx.fillStyle = ( i == 0 ) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if ( d == "LEFT" ) snakeX -= box;
  if ( d == "UP" ) snakeY -= box;
  if ( d == "RIGHT" ) snakeX += box;
  if ( d == "DOWN" ) snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    // we don't remove the tail
    score++;
    eat.play();
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    // remove the tail
    snake.pop();
  }

  // add new Head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over
  if (snakeX < box || snakeX > 17 * box ||
    snakeY < 3 * box || snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score,2*box,1.6*box);
}


const main = () => {
  window.removeEventListener('load', main)

  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");

  addEventListeners()
  loadImages()
  loadAudio()

  // call draw function every 200 ms
  game = setInterval(draw, 200)
}

window.addEventListener('load', main)