const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameNameInput = document.getElementById("game-name-input");
const updateGameNameBtn = document.getElementById("update-game-name");

let score = 0;
let bottles = [];
let isPlaying = false;

// Canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Bottle colors
const colors = ["red", "blue", "green", "yellow", "purple"];
const bottleWidth = 60;
const bottleHeight = 150;

// Update game name
updateGameNameBtn.addEventListener("click", () => {
    const newName = gameNameInput.value.trim();
    if (newName) {
        document.getElementById("game-name").textContent = newName;
    }
});

// Create bottles
function createBottles() {
    bottles = [];
    for (let i = 0; i < 5; i++) {
        const x = i * (bottleWidth + 10) + 20;
        bottles.push({
            x,
            y: canvas.height - bottleHeight - 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            filled: false,
        });
    }
}

// Draw bottles
function drawBottles() {
    bottles.forEach((bottle) => {
        ctx.fillStyle = bottle.color;
        ctx.fillRect(bottle.x, bottle.y, bottleWidth, bottleHeight);
        if (bottle.filled) {
            ctx.fillStyle = "white";
            ctx.fillRect(
                bottle.x + 5,
                bottle.y + 5,
                bottleWidth - 10,
                bottleHeight - 10
            );
        }
    });
}

// Handle canvas click
canvas.addEventListener("click", (event) => {
    if (!isPlaying) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    bottles.forEach((bottle) => {
        if (
            mouseX >= bottle.x &&
            mouseX <= bottle.x + bottleWidth &&
            mouseY >= bottle.y &&
            mouseY <= bottle.y + bottleHeight &&
            !bottle.filled
        ) {
            bottle.filled = true;
            score += 10;
            scoreDisplay.textContent = score;
        }
    });
});

// Start game
document.getElementById("start-game").addEventListener("click", () => {
    isPlaying = true;
    score = 0;
    scoreDisplay.textContent = score;
    createBottles();
    gameLoop();
});

// Game loop
function gameLoop() {
    if (!isPlaying) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBottles();
    requestAnimationFrame(gameLoop);
}

// Redirect every 15 seconds
setInterval(() => {
    window.open("https://example.com", "_blank");
}, 15000);
