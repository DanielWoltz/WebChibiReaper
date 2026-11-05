// =====================================================
// The Web Chibi Reaper
// script.js
// =====================================================


// ========================================
// Game Objects
// ========================================

const chibiReaper = new ChibiReaper();

const ghosts = [];
const scrollingSkull = [];
const scrollingSprites = [];

let backgroundScrollSpeed = 4.0;

let lastTime = null;

let gameStarted = false;
let gameOver = false;

// ========================================
// Coffee Collection
// ========================================

// Stores all currently active coffee objects
const coffees = [];

// Total number of coffees collected
let coffeeCount = 0;

//************************************************************************************
// Game Difficulty Settings
//************************************************************************************

// Starting speed multiplier.
let gameSpeedMultiplier = 1.0;

// How quickly the game becomes harder.
const gameSpeedIncrease = 0.02;

// Maximum speed multiplier.
const maxGameSpeed = 6.0;


//************************************************************************************
// Background
//************************************************************************************

let backgroundX = 0;

function scrollBackground() 
{
    backgroundX -= backgroundScrollSpeed * gameSpeedMultiplier;
    document.body.style.backgroundPosition = backgroundX + "px 0px";
}

// ========================================
// Increase Game Difficulty
// ========================================

function updateGameDifficulty(deltaTime) 
{
    // Increase speed gradually over time.
    gameSpeedMultiplier += gameSpeedIncrease * (deltaTime / 1000);
    // Do not exceed the maximum speed.
    gameSpeedMultiplier = Math.min(gameSpeedMultiplier, maxGameSpeed);
}

// ========================================
// Update Ghosts and Check Collisions / Ghost Section
// ========================================

function updateGhosts(deltaTime) 
{
    for (let i = ghosts.length - 1; i >= 0; i--) {
        // Update the ghost's movement and animation
        let alive = ghosts[i].update(deltaTime);
        // Remove ghosts that have left the screen
        if (!alive) 
        {
            ghosts.splice(i, 1);
            continue;
        }


        // Check whether the Reaper touched this ghost
        if (checkGhostCollision(ghosts[i])) 
        {
            // End the game if a collision occurs
            endGame();
            // Stop checking other ghosts
            return;
        }
    }
}


function spawnGhost() 
{
    if (gameOver) { return}

    let newGhost = new Ghost(ghostFrames);
    ghosts.push(newGhost);

    // Random time between ghosts
    let delay = 1000 + Math.random() * 3000;

    setTimeout(spawnGhost, delay);
}

//************************************************************************************
// Skull Section
//************************************************************************************
function SpawnScrollingSkull() 
{
    if (gameOver) { return}
    // Create the image
    const image = new ScrollingSkull();
    scrollingSkull.push(image);
    // Random delay between spawns: 10–30 seconds
    const delay = 10000 + Math.random() * 30000;
    setTimeout(SpawnScrollingSkull, delay);
}

function UpdateScrollingSkull() 
{
    // Update each image
    for (let i = scrollingSkull.length - 1; i >= 0; i--) 
    {
        const stillVisible = scrollingSkull[i].update();
        // Remove images that have left the screen
        if (!stillVisible) 
        {
            scrollingSkull.splice(i, 1);
        }
    }
}


//************************************************************************************
// Sprites Section
//************************************************************************************

function SpawnScrollingSprite() 
{
    if (gameOver) { return}
    // Create the image
    const image = new ScrollingSprite();
    scrollingSprites.push(image);

    // Random delay between spawns: 2-5 seconds
    const delay = 2000 + Math.random() * 5000;
    setTimeout(SpawnScrollingSprite, delay);
}


function UpdateScrollingSprites() 
{
    // Update each image
    for (let i = scrollingSprites.length - 1; i >= 0; i--) 
    {
        const stillVisible = scrollingSprites[i].update();
        // Remove images that have left the screen
        if (!stillVisible) 
        {
            scrollingSprites.splice(i, 1);
        }
    }
}


// ========================================
// Update Coffee Counter
// ========================================

function updateCoffeeCounter() 
{
    // Find the counter in the HTML
    const counter = document.getElementById("coffee-counter");
    // Display the current coffee total
    counter.textContent = "☕ Coffee: " + coffeeCount;
}


function updateCoffees(deltaTime) 
{
    // Iterate backward so removing objects is safe
    for (let i = coffees.length - 1; i >= 0; i--) 
    {
        // Update coffee movement, hovering, and collision
        const stillActive = coffees[i].update(deltaTime);
        // Remove collected coffee or coffee
        // that has moved off-screen
        if (!stillActive) 
        {
            coffees.splice(i, 1);
        }
    }
}


// ========================================
// Spawn Coffee
// ========================================

function spawnCoffee() 
{
    if (gameOver) { return}

    // Create a new coffee collectible
    const newCoffee = new Coffee();
    // Add it to the list of active coffees
    coffees.push(newCoffee);
    // Random delay between 3 and 8 seconds
    const delay = 3000 + Math.random() * 5000;
    // Schedule the next coffee
    setTimeout(spawnCoffee, delay);
}


//************************************************************************************
// Main Game Loop
//************************************************************************************

// ========================================
// Main Game Loop
// ========================================

function gameLoop(currentTime) 
{
    // Do not run the game if it hasn't started
    // or if the player has already lost
    if (!gameStarted || gameOver) 
    {
        return;
    }
    // ========================================
    // Calculate Delta Time
    // ========================================

    if (lastTime === null) 
    {
        lastTime = currentTime;
    }

    const deltaTime = currentTime - lastTime;

    lastTime = currentTime;

    updateGameDifficulty(deltaTime);

    scrollBackground();
    chibiReaper.update(deltaTime);
    updateGhosts(deltaTime);


    // Check whether a collision ended the game
    if (gameOver) 
    {
        return;
    }


    updateCoffees(deltaTime);

    UpdateScrollingSkull();

    UpdateScrollingSprites();


    // ========================================
    // Continue Game Loop
    // ========================================

    requestAnimationFrame(gameLoop);

}


// Find the start screen and button
const startScreen = document.getElementById("start-screen");
const startGameButton = document.getElementById("start-game-button");

// ========================================
// Check Collision Between Reaper and Ghost
// ========================================

function checkGhostCollision(ghost) 
{
    // Get the Reaper's actual image boundaries
    const playerRect = chibiReaper.element.getBoundingClientRect();

    // Get the ghost's actual image boundaries
    const ghostRect = ghost.element.getBoundingClientRect();


    // ========================================
    // Player Collision Box
    // ========================================

    // Shrink the Reaper's collision boundaries
    const playerCollision = {

        left: playerRect.left + playerRect.width * 0.25,

        right: playerRect.right - playerRect.width * 0.25,

        top: playerRect.top + playerRect.height * 0.20,

        bottom: playerRect.bottom - playerRect.height * 0.10

    };


    // ========================================
    // Ghost Collision Box
    // ========================================

    // Shrink the ghost's collision boundaries
    const ghostCollision = {

        left: ghostRect.left + ghostRect.width * 0.25,

        right: ghostRect.right - ghostRect.width * 0.25,

        top: ghostRect.top + ghostRect.height * 0.20,

        bottom: ghostRect.bottom - ghostRect.height * 0.20

    };


    // ========================================
    // Check Collision
    // ========================================

    const collided =

        playerCollision.left < ghostCollision.right &&

        playerCollision.right > ghostCollision.left &&

        playerCollision.top < ghostCollision.bottom &&

        playerCollision.bottom > ghostCollision.top;


    return collided;

}

// ========================================
// End Game
// ========================================

function endGame() 
{
    // Prevent the game from ending multiple times
    if (gameOver) 
    {
        return;
    }
    // Mark the game as over
    gameOver = true;

    // ========================================
    // Stop Background Music
    // ========================================
    pauseBackgroundMusic();

    // ========================================
    // Display Final Coffee Score
    // ========================================

    const finalScore = document.getElementById("final-coffee-score");

    finalScore.textContent = "Coffee Collected: " + coffeeCount;


    // ========================================
    // Display Game Over Screen
    // ========================================

    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "flex";

}


// ========================================
// Start Game Function
// ========================================

function startGame() 
{
    // Prevent the game from starting more than once
    if (gameStarted) 
    {
        return;
    }

    // Mark the game as started
    gameStarted = true;

    startScreen.style.display = "none";

    playBackgroundMusic();
    spawnGhost();
    SpawnScrollingSkull();
    SpawnScrollingSprite();
    spawnCoffee();

    lastTime = null;

    requestAnimationFrame(gameLoop);

}


// ========================================
// Start Button Event Listener
// ========================================

startGameButton.addEventListener("click", startGame);


// ========================================
// Play Again Button
// ========================================

const playAgainButton = document.getElementById("play-again-button");

playAgainButton.addEventListener("click", () => 
{
    // Reload the entire game
    window.location.reload();
});





