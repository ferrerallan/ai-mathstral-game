const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 200,
  y: 200,
  width: 20,
  height: 20,
  color: "white",
  speed: 20,
};

const star = {
  x: Math.random() * (canvas.width - 10),
  y: Math.random() * (canvas.height - 10),
  width: 15,
  height: 15,
  color: "yellow",
};

let score = 0;
let running = true;

function createMovementPromptX(xSquare, ySquare, xCircle, yCircle) {
  return `
    Respond only with 'L' for yes or 'R' for no. Ensure absolute accuracy in your response. 
    Question: Is ${xSquare} greater than ${xCircle}? 
  `;
}

function createMovementPromptY(xSquare, ySquare, xCircle, yCircle) {
  return `
    Respond only with 'U' for yes or 'D' for no. Ensure absolute accuracy in your response. 
    Question: Is ${ySquare} greater than ${yCircle}? 
  `;
}

async function askOllama(question) {
  const url = "http://localhost:11434/api/chat";

  const payload = {
    model: "mathstral",
    messages: [{ role: "user", content: question }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const responseText = await response.text();
    const lines = responseText.trim().split("\n");
    let fullContent = "";

    lines.forEach((line) => {
      const data = JSON.parse(line);
      if (data.message && data.message.role === "assistant") {
        fullContent += data.message.content;
      }
    });

    return fullContent;
  } catch (error) {
    console.error(error.message);
  }
}

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function calculateDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy).toFixed(2);
}

function update() {
  if (!running) return;

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width)
    player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height)
    player.y = canvas.height - player.height;

  if (checkCollision(player, star)) {
    score++;
    star.x = Math.random() * (canvas.width - star.width);
    star.y = Math.random() * (canvas.height - star.height);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = star.color;
  ctx.fillRect(star.x, star.y, star.width, star.height);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
  const distance = calculateDistance(player, star);
  ctx.fillText(`Player Position: (${player.x}, ${player.y})`, 10, 40);
  ctx.fillText(`Star Position: (${star.x.toFixed(0)}, ${star.y.toFixed(0)})`, 10, 60);
  ctx.fillText(`Distance: ${distance}`, 10, 80);
}

async function getRandomDirection({ currentPosition, starPosition }) {
  const diff = Math.abs(currentPosition[0] - starPosition[0]);
  const prompt =
    diff < 15
      ? createMovementPromptY(...currentPosition, ...starPosition)
      : createMovementPromptX(...currentPosition, ...starPosition);

  // console.log(prompt);
  console.log('analyse',currentPosition,starPosition);
  const response = await askOllama(prompt);
  console.log('response',response);
  if (response) processMove(response.trim().toUpperCase());
}

function processMove(input) {
  if (input === "U") player.y -= player.speed;
  else if (input === "D") player.y += player.speed;
  else if (input === "L") player.x -= player.speed;
  else if (input === "R") player.x += player.speed;

  update();
  draw();
}

async function autoPlay() {
  while (running) {
    const currentPosition = [player.x, player.y];
    const starPosition = [star.x, star.y];
    const distance = calculateDistance(player, star);

    getRandomDirection({ currentPosition, starPosition, distance });
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
}

draw();
autoPlay();
