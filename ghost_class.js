// ****************************************************************
// Ghost Animation Frames
// ****************************************************************

const ghostFrames = [

    "ghost_images/GhostArmBack.png",
    "ghost_images/GhostArmBackTransition.png",
    "ghost_images/GhostDefault.png",
    "ghost_images/GhostArmForwardTransition.png",
    "ghost_images/GhostArmForward.png",
    "ghost_images/GhostArmForwardTransition.png",
    "ghost_images/GhostDefault.png",
    "ghost_images/GhostArmBackTransition.png"

];


// ****************************************************************
// Ghost Settings
// ****************************************************************

// Horizontal movement speed, in pixels per frame
const ghostSpeed = 5;

// Time between sprite changes, in milliseconds
const ghostAnimationSpeed = 200;


class Ghost {

    constructor(ghostFrames) 
    {

        // ****************************************************************
        // Position
        // ****************************************************************

        // Start off-screen on the right
        this.x = window.innerWidth + 100;

        // Pick an original height closer to the ground
        this.baseY = window.innerHeight - 175 - Math.random() * 75;

        // Start at the original vertical position
        this.y = this.baseY;


        // ****************************************************************
        // Movement
        // ****************************************************************
        this.speed = ghostSpeed;

        // ****************************************************************
        // Hovering
        // ****************************************************************

        // Maximum distance to float up and down
        this.hoverHeight = 25;

        // Hovering speed
        this.hoverSpeed = 0.003;

        // Give each ghost a random starting phase
        this.hoverTime = Math.random() * Math.PI * 2;


        // ****************************************************************
        // Animation
        // ****************************************************************
        // Store the sprite images for this ghost
        this.frames = ghostFrames;
        // Start at the first sprite
        this.frame = 0;
        // Track elapsed animation time
        this.animationTimer = 0;
        // Time between sprite changes
        this.animationSpeed = ghostAnimationSpeed;
        // ****************************************************************
        // Create Image Element
        // ****************************************************************
        this.element = document.createElement("img");
        this.element.src = this.frames[0];
        this.element.className = "ghost";

        // Add the ghost to the webpage
        document.body.appendChild(this.element);
        // ****************************************************************
        // Set Initial Position
        // ****************************************************************
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }


    // ****************************************************************
    // Update Ghost
    // ****************************************************************

    update(deltaTime) 
    {
        // Move Left
        this.x -= this.speed * gameSpeedMultiplier;
        this.element.style.left = this.x + "px";


        // ****************************************************************
        // Hover Up and Down
        // Advance the hovering timer
        this.hoverTime += deltaTime * this.hoverSpeed * gameSpeedMultiplier;
        // Calculate the new vertical position
        this.y = this.baseY + Math.sin(this.hoverTime) * this.hoverHeight;

        // Apply the vertical position
        this.element.style.top = this.y + "px";


        // ****************************************************************
        // Animate Sprite
        // Accumulate elapsed time
        this.animationTimer += deltaTime;

        // Is it time to change the sprite?
        if (this.animationTimer >= this.animationSpeed) 
        {
            // Preserve any extra elapsed time
            this.animationTimer -= this.animationSpeed;
            // Move to the next frame
            this.frame++;
            // Loop back to the first frame
            if (this.frame >= this.frames.length) 
            {
                this.frame = 0;
            }
            // Display the next sprite
            this.element.src = this.frames[this.frame];
        }


        // ****************************************************************
        // Remove Ghost When Off-Screen
        // ****************************************************************

        if (this.x < -100) 
        {
            // Remove the image from the webpage
            this.element.remove();
            // Tell the game to remove this ghost
            // from its active ghost collection
            return false;
        }
        // Ghost is still active
        return true;
    }
}


// ****************************************************************
// Update All Ghosts
// ****************************************************************

function updateGhosts(deltaTime) 
{
    // Iterate backward so removing ghosts is safe
    for (let i = ghosts.length - 1; i >= 0; i--) 
    {
        // Update this ghost
        const alive = ghosts[i].update(deltaTime);
        // Remove ghosts that have left the screen
        if (!alive) 
        {
            ghosts.splice(i, 1);
        }
    }
}


// ****************************************************************
// Spawn Ghosts
// ****************************************************************

function spawnGhost() 
{
    // Create a new ghost using the sprite frames
    const newGhost = new Ghost(ghostFrames);
    // Add it to the active ghost collection
    ghosts.push(newGhost);
    // Random delay between 1 and 4 seconds
    const delay = 1000 + Math.random() * 3000;
    // Schedule the next ghost
    setTimeout(spawnGhost, delay);
}