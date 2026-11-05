
class ScrollingSprite {

    constructor() {

        // ========================================
        // Available Images
        // ========================================

        // Store the paths of images in another subfolder.
        // Add or remove image paths as needed.
        const imagePaths = [
            "game_images/Ground_Level/BushOrange.png",
            "game_images/Ground_Level/BushYellow.png",
            "game_images/Ground_Level/JackLantern.png",
            "game_images/Ground_Level/Pumpkin.png",
            "game_images/Ground_Level/PumpkinYellow.png",
            "game_images/Ground_Level/RIPCrumbleBlue.png",
            "game_images/Ground_Level/RIPCrumbleGreen.png",
            "game_images/Ground_Level/RIPCrumbleOrange.png",
            "game_images/Ground_Level/RIPCrumbleRed.png",
            "game_images/Ground_Level/RIPMossBlue.png",
            "game_images/Ground_Level/RIPMossGreen.png",
            "game_images/Ground_Level/RIPMossOrange.png",
            "game_images/Ground_Level/RIPMossRed.png",
            "game_images/Ground_Level/RIPRoundBlue.png",
            "game_images/Ground_Level/RIPRoundGreen.png",
            "game_images/Ground_Level/RIPRoundOrange.png",
            "game_images/Ground_Level/RIPRoundRed.png",
            "game_images/Ground_Level/RIPSquareBlue.png",
            "game_images/Ground_Level/RIPSquareGreen.png",
            "game_images/Ground_Level/RIPSquareOrange.png",
            "game_images/Ground_Level/RIPSquareRed.png",
            "game_images/Ground_Level/TreeDead.png",
            "game_images/Ground_Level/TreeOrange.png",
            "game_images/Ground_Level/TreeYellow.png"
        ];


        // ========================================
        // Select a Random Image
        // ========================================

        // Generate a random index from the image list.
        const randomIndex = Math.floor(Math.random() * imagePaths.length);

        // Select the image at that random index.
        this.imagePath = imagePaths[randomIndex];


        // ========================================
        // Starting Position
        // ========================================

        // Start just beyond the right edge of the screen.
        this.x = window.innerWidth + 50;

        // Position the image near the bottom of the screen.
        this.y = window.innerHeight - 145;


        // ========================================
        // Movement Speed
        // ========================================

        this.speed = backgroundScrollSpeed;


        // ========================================
        // Create Image Element
        // ========================================

        this.element = document.createElement("img");

        // Use the randomly selected image.
        this.element.src = this.imagePath;

        this.element.className = "scrolling-image";


        // Add the image to the webpage.
        document.body.appendChild(this.element);


        // Set its initial position.
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";

    }


    // ========================================
    // Update Image Movement
    // ========================================

    update() {

        // Move the image left.
        this.x -= this.speed * gameSpeedMultiplier;

        this.element.style.left = this.x + "px";


        // Remove it after it leaves the screen.
        if (this.x < -100) {

            this.element.remove();

            return false;

        }

        return true;

    }

}