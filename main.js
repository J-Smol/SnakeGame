const canvas = document.getElementById("game"),
	  ctx = canvas.getContext("2d");

const ground = new Image(),
	  foodImage = new Image();

ground.src = "img/bg.png";
foodImage.src = "img/food.png";

let box = 32,
	score = 0;

let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];

snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right") {
		dir = "left";
	} else if (event.keyCode == 38 && dir != "down") {
		dir = "up";
	} else if (event.keyCode == 39 && dir != "left") {
		dir = "right";
	} else if (event.keyCode == 40 && dir != "up") {
		dir = "down";
	}
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y) {
			clearInterval(game);
		}
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImage, food.x, food.y);

	for (let i =0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "red";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "36px Verdana";
	ctx.fillText(score, box * 2.5, box * 1.6);

	let snakeX = snake[0].x,
		snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor(Math.random() * 17 + 1) * box,
			y: Math.floor(Math.random() * 15 + 3) * box
		};
	} else {
		snake.pop();
	}

	if (snakeX < box || snakeX > box *17 || 
		snakeY < box *3 || snakeY > box * 17) {
		clearInterval(game);
	}

	if (dir == "left") {
		snakeX -= box;
	} else if (dir == "right") {
		snakeX += box;
	} else if (dir == "up") {
		snakeY -= box;
	} else if (dir == "down") {
		snakeY += box;
	};

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}
 
let game = setInterval(drawGame, 100);








