
class ScrollingSkull {

    constructor() {

        // ========================================
        // Image Settings
        // ========================================

        // The one image we want to display
        this.imagePath = "game_images/Skull.png";


        // ========================================
        // Starting Position
        // ========================================

        // Start just beyond the right edge of the screen
        this.x = window.innerWidth + 50;

        // Choose a random vertical position
        //this.y = 100 + Math.random() * (window.innerHeight - 250);
        this.y = window.innerHeight - 50;

        // ========================================
        // Movement Speed
        // ========================================

        this.speed = backgroundScrollSpeed;


        // ========================================
        // Create Image Element
        // ========================================

        this.element = document.createElement("img");

        this.element.src = this.imagePath;

        this.element.className = "scrolling-image";


        // Add the image to the webpage
        document.body.appendChild(this.element);


        // Set its initial position
        this.element.style.left = this.x + "px";

        this.element.style.top = this.y + "px";

    }


    // ========================================
    // Update Image Movement
    // ========================================

    update() {

        // Move the image left
        this.x -= this.speed * gameSpeedMultiplier;

        this.element.style.left = this.x + "px";


        // Remove it after it leaves the screen
        if (this.x < -100) {

            this.element.remove();

            return false;

        }

        return true;

    }

}