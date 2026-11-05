class ChibiReaper {

    constructor() {

        // ****************************************************************
        // Get player HTML element
        // ****************************************************************
        this.element = document.getElementById("player");

        // ****************************************************************
        // Player Position
        // ****************************************************************

        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 175;


        // ****************************************************************
        // Player Physics
        // ****************************************************************

        // Current vertical velocity
        this.velocityY = 0;

        // Gravity
        this.gravity = 0.6;

        // Initial jump strength
        this.jumpPower = -12;

        // Is the player currently jumping?
        this.jumping = false;


        // ****************************************************************
        // Variable Jump
        // ****************************************************************

        // Is Space currently being held?
        this.holdingJump = false;

        // Maximum amount of time
        // the player can extend a jump
        this.maxHoldTime = 15;

        // Current amount of jump hold time
        this.holdTime = 0;

        // ****************************************************************
        // Animation
        // ****************************************************************

        this.runningFrames = [
            "reaper_images/ReaperArmBackwards.png",
            "reaper_images/ReaperArmBackwardsTransition.png",
            "reaper_images/ReaperDefault.png",
            "reaper_images/ReaperArmForwardTransition.png",
            "reaper_images/ReaperArmForward.png",
            "reaper_images/ReaperArmForwardTransition.png",
            "reaper_images/ReaperDefault.png",
            "reaper_images/ReaperArmBackwardsTransition.png"
        ];

        this.jumpFrames = [
            "reaper_images/ReaperForwardJump1.png",
            "reaper_images/ReaperForwardJump2.png",
            "reaper_images/ReaperForwardJump3.png",
            "reaper_images/ReaperForwardJump4.png",
            "reaper_images/ReaperForwardJump5.png",
            "reaper_images/ReaperForwardJump4.png",
            "reaper_images/ReaperForwardJump3.png",
            "reaper_images/ReaperForwardJump2.png",
            "reaper_images/ReaperForwardJump1.png"
        ];

        this.frames = this.runningFrames;
        // Current animation frame
        this.frame = 0;


        // Change sprite every 120 milliseconds
        this.animationSpeed = 120;

        this.animationTimer = 0;

        this.currentAnimation = "running";

        // ****************************************************************
        // Start Animation
        // ****************************************************************

        this.element.src = this.frames[0];

        // ****************************************************************
        // Keyboard Input
        // ****************************************************************

        this.setupKeyboard();

        // ****************************************************************
        // Set Initial Position
        // ****************************************************************

        this.updateElement();

    }

    // ****************************************************************
    // Keyboard Input
    // ****************************************************************

    setupKeyboard() {
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") 
             {
                // Prevent browser from scrolling
                event.preventDefault();
                // Only jump if we're on the ground
                if (!this.jumping) {

                    this.velocityY = this.jumpPower;
                    this.jumping = true;
                    this.holdingJump = true;
                    this.holdTime = 0;
                }
            }
        });


        document.addEventListener("keyup", (event) => {
            if (event.code === "Space") 
            {
                this.holdingJump = false;
            }
        });
    }


    // ****************************************************************
    // Update Player
    // ****************************************************************

    update(deltaTime) 
    {
        this.updateJump(deltaTime);
        this.animate(deltaTime);
        this.updateElement();
    }

    // ****************************************************************
    // Jump Physics
    // ****************************************************************

    updateJump(deltaTime) 
    {
        // ****************************************************************
        // Variable Jump Height
        // ****************************************************************

        if (this.holdingJump && this.holdTime < this.maxHoldTime) 
        {
            this.velocityY -= 0.4;
            this.holdTime++;
        }

        // ****************************************************************
        // Gravity
        // ****************************************************************

        this.velocityY += this.gravity;

        // ****************************************************************
        // Move Player
        // ****************************************************************

        this.y += this.velocityY;

        // ****************************************************************
        // Ground Level
        // ****************************************************************

        const floor = window.innerHeight - 175;

        // ****************************************************************
        // Prevent Falling Through Ground
        // ****************************************************************

        if (this.y >= floor) 
        {
            this.y = floor;
            this.velocityY = 0;
            this.jumping = false;
        }
    }

    // ****************************************************************
    // Player Animation
    // ****************************************************************

    animate(deltaTime) 
    {
        // Decide which animation should be active
        const nextAnimation = this.jumping ? "jumping" : "running";

        // Check whether the animation needs to change
        if (nextAnimation !== this.currentAnimation) 
        {
            // Remember the new animation
            this.currentAnimation = nextAnimation;

            // Select the correct sprite set
            this.frames = this.jumping ? this.jumpFrames : this.runningFrames;
            // Start the new animation from its first frame
            this.frame = 0;
            // Reset the animation timer
            this.animationTimer = 0;
            // Display the first sprite immediately
            this.element.src = this.frames[this.frame];
        }

        // Add elapsed time
        this.animationTimer += deltaTime;
        // Has enough time passed to change frames?
        if (this.animationTimer >= this.animationSpeed) 
        {
            // Preserve extra elapsed time
            this.animationTimer -= this.animationSpeed;
            // Move to the next frame
            this.frame++;
            // Loop through the current animation
            if (this.frame >= this.frames.length) 
            {
                this.frame = 0;
            }

            // Display the selected sprite
            this.element.src = this.frames[this.frame];
        }
    }



    // ****************************************************************
    // Update HTML Element
    // ****************************************************************

    updateElement() 
    {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }

}