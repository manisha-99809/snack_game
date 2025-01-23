
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const box = 20;
    const canvasSize = canvas.width / box;

    let snake = [{ x: 10, y: 10 }];
    let food = {
      x: Math.floor(Math.random() * canvasSize),
      y: Math.floor(Math.random() * canvasSize)
    };
    let direction = "";
    let score = 0;

    function drawBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the food
      ctx.fillStyle = "yellow";
      ctx.fillRect(food.x * box, food.y * box, box, box);

      // Draw the snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "red" : "lime";
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
      });

      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 10, 20);
    }

    function moveSnake() {
      const head = { ...snake[0] };

      switch (direction) {
        case "ArrowUp":
          head.y -= 1;
          break;
        case "ArrowDown":
          head.y += 1;
          break;
        case "ArrowLeft":
          head.x -= 1;
          break;
        case "ArrowRight":
          head.x += 1;
          break;
        default:
          return;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        resetGame();
        return;
      }

      // Check collision with self
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
      }

      snake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
          x: Math.floor(Math.random() * canvasSize),
          y: Math.floor(Math.random() * canvasSize)
        };
      } else {
        snake.pop();
      }
    }

    function resetGame() {
      alert(`Game Over! Your score is ${score}.`);
      snake = [{ x: 10, y: 10 }];
      direction = "";
      score = 0;
    }

    document.addEventListener("keydown", event => {
      const allowedDirections = {
        ArrowUp: "ArrowDown",
        ArrowDown: "ArrowUp",
        ArrowLeft: "ArrowRight",
        ArrowRight: "ArrowLeft"
      };

      if (event.key in allowedDirections && event.key !== allowedDirections[direction]) {
        direction = event.key;
      }
    });

    function gameLoop() {
      moveSnake();
      drawBoard();
    }

    setInterval(gameLoop, 100);
  