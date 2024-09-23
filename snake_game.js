let width = 720;
let widthCell = 40;

let canvas = document.getElementById('plateau');
canvas.width = width;
canvas.height = width;
canvas.style.border = '1px solid black';

let context = canvas.getContext('2d');

let food = {
    x: 0,
    y: 0
}

let snake = {
    x: 0,
    y: 0,
    direction: 'right',
    body: []
}

let canStart = false;

let assetsFoodUrl = 'assets/food.png';
let assetsFood = new Image();
assetsFood.src = assetsFoodUrl;

assetsFood.onload = function() {
    canStart = true;
    setup();
}

function setup () {
    
    generateFood();
    drawFood();
    
    drawSnake();
}

function generateFood() {
    food.x = Math.floor(
        Math.random() * (width / widthCell)
    );
    food.y = Math.floor(
        Math.random() * (width / widthCell)
    );
}

function drawFood() {
    // context.fillStyle = 'red';
    // context.fillRect(
    //     food.x * widthCell, 
    //     food.y * widthCell,
    //     widthCell, widthCell
    // );

    context.drawImage(
        assetsFood, // image

        // par rapport à l'image
        132 * 0, 0,
        132, 132,

        // par rapport au canvas
        food.x * widthCell, food.y * widthCell,
        widthCell, widthCell
    )

}


function drawSnake() {
    context.fillStyle = 'green';
    context.fillRect(
        snake.x * widthCell, 
        snake.y * widthCell,
        widthCell, widthCell
    );


    for (let i = 0; i < snake.body.length; i++) {
        context.fillRect(
            snake.body[i].x * widthCell, 
            snake.body[i].y * widthCell,
            widthCell, widthCell
        );
    }
}


document.addEventListener('keydown', changeDirection);


function changeDirection(event) {
    
    switch(event.key) {
        case 'ArrowUp':     snake.direction = 'up';     break;
        case 'ArrowDown':   snake.direction = 'down';   break;
        case 'ArrowLeft':   snake.direction = 'left';   break;
        case 'ArrowRight':  snake.direction = 'right';  break;
    }
}

function moveSnake () {

    snake.body.unshift({
        x: snake.x,
        y: snake.y
    });

    snake.body.pop();


    switch(snake.direction) {
        case 'up':    snake.y--; break;
        case 'down':  snake.y++; break;
        case 'left':  snake.x--; break;
        case 'right': snake.x++; break;
    }
}


function foodCollision() {
    if (snake.x === food.x && snake.y === food.y) {
        generateFood();
        snake.body.push({
            x: snake.x, 
            y: snake.y
        });
    }
}

function borderCollision() {
    let numberOfCells = width / widthCell;

    if (
        snake.x < 0 
        || snake.x >= numberOfCells
        || snake.y < 0
        || snake.y >= numberOfCells
    ) {
        clearInterval(interval);
        alert('Game Over');
    }
}







function draw() {
    context.clearRect(0, 0, width, width);

    drawFood();
    drawSnake();
}

function gameLoop() {
    
    moveSnake();

    foodCollision();
    borderCollision();

    draw();
}

let isRunning = false;

document.addEventListener('keydown', function(event) {
    if (canStart && !isRunning) {
        if (event.key === 'Enter') {
            interval = setInterval(gameLoop, 250);
            isRunning = true;
        }
    }
})











function drawLigne(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}
