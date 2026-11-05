class Coffee {

    constructor() 
    {
        // ****************************************************************
        // Position
        // ****************************************************************

        // Start just outside the right side of the screen
        this.x = window.innerWidth + 50;

        // Choose a random starting height.
        // This allows coffee to appear at different
        // heights for the player to collect.
        this.y = window.innerHeight - 200 - Math.random() * 120;


        // ****************************************************************
        // Movement
        // ****************************************************************
        // Base horizontal movement speed
        this.speed = backgroundScrollSpeed;

        // ****************************************************************
        // Hovering Animation
        // ****************************************************************

        // Remember the coffee's original vertical position
        this.baseY = this.y;
        // Maximum distance the coffee floats up and down
        this.hoverHeight = 8;
        // Controls how quickly the coffee floats
        this.hoverSpeed = 0.003;

        // Give each coffee a random starting point
        // in its hovering cycle
        this.hoverTime = Math.random() * Math.PI * 2;


        // ****************************************************************
        // Create Coffee Image
        // ****************************************************************

        this.element = document.createElement("img");
        // Path to the coffee image
        this.element.src = "game_images/Coffee.png";
        this.element.alt = "Coffee collectible";
        this.element.className = "coffee";
        // Add the coffee image to the webpage
        document.body.appendChild(this.element);
        // ****************************************************************
        // Set Initial Position
        // ****************************************************************
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";

    }


    // ****************************************************************
    // Update Coffee
    // ****************************************************************

    update(deltaTime) {

        // ****************************************************************
        // Move Coffee Horizontally
        // ****************************************************************

        // Move coffee from right to left.
        // The coffee moves faster as the game speeds up.
        this.x -= this.speed * gameSpeedMultiplier;

        // Apply the horizontal position
        this.element.style.left = this.x + "px";


        // ****************************************************************
        // Hover Up and Down
        // ****************************************************************

        // Advance the hovering animation.
        // The hovering speeds up as the game gets harder.
        this.hoverTime += deltaTime * this.hoverSpeed * gameSpeedMultiplier;

        // Calculate the vertical position using a sine wave.
        // The coffee moves smoothly above and below baseY.
        this.y = this.baseY + Math.sin(this.hoverTime) * this.hoverHeight;

        // Apply the vertical position
        this.element.style.top = this.y + "px";


        // ****************************************************************
        // Check Collision With Player
        // ****************************************************************

        // Get the player's current on-screen rectangle
        const playerRect = chibiReaper.element.getBoundingClientRect();

        // Get the coffee's current on-screen rectangle
        const coffeeRect = this.element.getBoundingClientRect();

        // Check whether the two rectangles overlap
        const collided =
            playerRect.left < coffeeRect.right &&
            playerRect.right > coffeeRect.left &&
            playerRect.top < coffeeRect.bottom &&
            playerRect.bottom > coffeeRect.top;


        // ****************************************************************
        // Collect Coffee
        // ****************************************************************

        if (collided) 
        {
            // Increase the coffee counter
            coffeeCount++;
            // Update the counter displayed on the page
            updateCoffeeCounter();
            // Remove the coffee image from the webpage
            this.element.remove();
            // Tell the game this coffee is no longer active
            return false;
        }

        // ****************************************************************
        // Remove Coffee When Off-Screen
        // ****************************************************************

        if (this.x < -100) 
        {
            // Remove the image from the webpage
            this.element.remove();
            // Tell the game this coffee is no longer active
            return false;
        }
        // ****************************************************************
        // Coffee Is Still Active
        // ****************************************************************
        return true;
    }
}
