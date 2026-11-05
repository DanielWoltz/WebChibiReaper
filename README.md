# The Web Chibi Reaper

A spooky, browser-based endless-runner game built with **HTML, CSS, and
JavaScript**.

In *The Web Chibi Reaper*, guide a little reaper through a haunted
environment, jump over ghosts, and collect as much coffee as possible.
The game includes animated characters, scrolling scenery, increasing
difficulty, background music, and start/game-over screens.

## Table of Contents

-   [Features](#features)
-   [How to Play](#how-to-play)
-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)
-   [Game Systems](#game-systems)
-   [Customization](#customization)
-   [Troubleshooting](#troubleshooting)
-   [Future Ideas](#future-ideas)

## Features

-   **Player animation:** Running and jumping animations for the Chibi
    Reaper.
-   **Ghost enemies:** Animated ghosts that enter from the side of the
    screen and move toward the player.
-   **Jump controls:** Jumping with gravity and variable jump behavior.
-   **Scrolling environment:** A horizontally scrolling background with
    randomly selected scenery sprites.
-   **Collectibles:** Coffee items appear in the game world and increase
    the player's coffee score when collected.
-   **Difficulty progression:** The game gradually increases its speed
    as the player survives.
-   **Collision detection:** Collisions with ghosts end the current run;
    collecting coffee increases the score.
-   **Music controls:** Background music can be played, paused, and
    adjusted with a volume slider.
-   **Start and game-over screens:** Start a run from the title screen
    and view the final coffee count when the game ends.
-   **Replay:** Start a fresh run using the Play Again button.

## How to Play

1.  Open the game in your browser.
2.  Select **Start Game**.
3.  Press **Spacebar** to make the Chibi Reaper jump.
4.  Avoid the ghosts.
5.  Collect coffee items to increase your score.
6.  Use the music controls to play or pause the background music and
    adjust its volume.
7.  If a ghost catches the player, the game ends and displays the coffee
    collected during that run.
8.  Select **Play Again** to restart.

## Getting Started

### Requirements

-   A modern web browser (such as Chrome, Firefox, or Edge).
-   The game project files, including the HTML, CSS, JavaScript, image,
    and audio assets.

No JavaScript framework or build process is required for the current
browser-based version.

### Run the game

1.  Download or clone the project.

2.  Open the project folder in Visual Studio Code or another editor.

3.  Start a local web server from the project folder.

    For example, if Python is installed, open a terminal in the project
    folder and run:

    ``` bash
    python -m http.server 8080
    ```

4.  Open the following address in your browser:

    ``` text
    http://localhost:8080
    ```

5.  Open the game's `index.html` page if it is not the default page
    served by the project.

You can also use a local-server extension in Visual Studio Code. Running
the project through a local server is generally more reliable than
opening the HTML file directly, particularly as the project grows.

## Project Structure

The project has been developed as a collection of separate HTML, CSS,
and JavaScript files. Your exact filenames may differ as the project
evolves.

A representative layout is:

``` text
The-Web-Chibi-Reaper/
│
├── index.html
├── style.css
├── script.js
│
├── chibi_reaper_class.js
├── ghost_class.js
├── scrolling_skull.js
├── scrolling_sprites.js
├── coffee_class.js
├── music.js
│
├── reaper_images/
│   ├── ReaperDefault.png
│   ├── ReaperArmBackwards.png
│   ├── ReaperArmForward.png
│   └── ...player animation frames
│
├── ghost_images/
│   └── ...ghost animation frames
│
├── game_images/
│   ├── Coffee.png
│   └── Ground_Level/
│       └── ...environment sprites
│
└── audio/
    └── background_music.mp3
```

**Important:** This is an example based on the files and asset folders
used during development. Keep the paths in your JavaScript and HTML
consistent with the actual names and locations in your project. The
scenery system uses image paths; a browser cannot automatically discover
every file in a folder without an image manifest or another file-listing
mechanism.

## Game Systems

### Main game loop

The main JavaScript file coordinates the game. It updates the player,
enemies, collectibles, scrolling scenery, background, and difficulty
over time.

### Player

The `ChibiReaper` class manages the player character, including
position, jumping physics, and animation frames.

### Ghosts

The `Ghost` class manages enemy movement and animation. Ghosts are
spawned at intervals and move toward the player. Contact with a ghost
triggers the game-over state.

### Scrolling objects and scenery

The scrolling classes create environmental objects that enter from the
right side of the screen and move left. The scenery system can select
from a collection of image assets.

### Coffee collectibles

The `Coffee` class creates coffee collectibles, moves them across the
screen, and checks whether the player has collected them. Each
successful collection increases the coffee counter.

### Difficulty

The game uses a speed multiplier that increases as the run continues, up
to a configured maximum. This makes the game progressively more
challenging.

### Music

The music controller manages background playback, the play/pause button,
and volume. Browsers commonly require playback to begin after a user
interaction, so music is started from the Start Game action rather than
automatically on page load.

### Game states

The game has a start state and a game-over state. The animation loop
begins when the player starts a game and stops when the game ends. Play
Again reloads the page to reset the run.

## Customization

The game can be customized by changing values and assets in the relevant
files:

-   **Player appearance:** Replace or add images in `reaper_images/` and
    update the player animation frame lists.
-   **Ghost appearance:** Replace or add ghost images in `ghost_images/`
    and update the ghost frame list.
-   **Scenery:** Add image assets to the scenery folder and include
    their paths in the image list or manifest used by the
    scrolling-sprite system.
-   **Coffee appearance:** Replace `game_images/Coffee.png` or update
    the image path in the `Coffee` class.
-   **Game speed:** Adjust the starting speed, speed-increase amount,
    and maximum speed in the main game script.
-   **Spawn frequency:** Adjust the delay ranges in the enemy, scenery,
    and coffee spawn functions.
-   **Music:** Replace the audio file at `audio/background_music.mp3`,
    or update the path in `music.js`.
-   **Visual styling:** Edit `style.css` to change screen layout,
    sprites, counters, and menu appearance.

When adding or renaming assets, make sure the file paths and
capitalization match exactly. This matters on many web servers and
hosting platforms.

## Troubleshooting

### The browser says it cannot reach `localhost`

Make sure a local web server is running in the project folder. Starting
Chrome with a debugging configuration does not itself start a web
server.

### Images do not appear

-   Check that the image exists in the expected folder.
-   Check the path and filename, including capitalization and file
    extension.
-   Open the browser developer tools and check the Console and Network
    panels for missing-file errors.

### Background music does not start

-   Click **Start Game** or the music button to provide the user
    interaction browsers require.
-   Confirm that the audio file exists at the path configured in
    `music.js`.
-   Check the browser console for playback or file-loading errors.

### A JavaScript error appears

-   Check the browser developer tools Console for the first error.
-   Confirm that each JavaScript file is included in `index.html`.
-   Make sure class files load before `script.js`, which creates and
    uses those classes.
-   Check for duplicate function or class declarations if code has been
    copied between files.

## Future Ideas

Possible additions for future versions include:

-   A saved high score.
-   Sound effects for jumping, collecting coffee, and collisions.
-   Power-ups such as temporary invincibility or a coffee magnet.
-   Additional enemy types and movement patterns.
-   New environments and levels.
-   Double-jump or slide mechanics.
-   Particle effects, screen shake, and additional visual feedback.

## Credits

Created as a personal learning and game-development project using HTML,
CSS, and JavaScript.

Game artwork, audio, and other assets should be credited here according
to their sources and licenses.
