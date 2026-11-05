// ========================================
// Create Background Music
// ========================================

// Load the background music file
const backgroundMusic = new Audio( "music/Phantom Pixels.mp3");

// Repeat the music continuously
backgroundMusic.loop = true;

// Set the initial volume.
// Values range from 0.0 (silent) to 1.0 (maximum).
backgroundMusic.volume = 0.3;

// ========================================
// Play Background Music
// ========================================

async function playBackgroundMusic() {
    try 
    {
        await backgroundMusic.play();
        // Update the music button after playback starts
        musicToggleButton.textContent = "Pause Music";
        console.log("Background music started.");

    } 
    catch (error) 
    {
        console.log("Music could not start:", error);
        // Keep the button text accurate if playback fails
        musicToggleButton.textContent = "Play Music";
    }
}


// ========================================
// Pause Background Music
// ========================================

function pauseBackgroundMusic() 
{
    backgroundMusic.pause();
    // Update the button text
    musicToggleButton.textContent = "Play Music";
}

// ========================================
// Toggle Music Playback
// ========================================

function toggleBackgroundMusic() 
{
    if (backgroundMusic.paused) 
    {
        playBackgroundMusic();
    } 
    else 
    {
        pauseBackgroundMusic();
    }
}


// ========================================
// Change Music Volume
// ========================================

function setBackgroundMusicVolume(volume) 
{
    // Keep the volume between 0.0 and 1.0
    backgroundMusic.volume = Math.max(0, Math.min(1, volume));
}

// ========================================
// Connect HTML Controls
// ========================================

const musicToggleButton = document.getElementById("music-toggle");
const musicVolumeSlider = document.getElementById("music-volume");

// ========================================
// Play or Pause Button
// ========================================

musicToggleButton.addEventListener("click", async () => 
{
    if (backgroundMusic.paused) 
    {
        await playBackgroundMusic();
        // Update the button label
        if (!backgroundMusic.paused) 
        {
            musicToggleButton.textContent = "Pause Music";
        }

    } 
    else 
    {
        pauseBackgroundMusic();
        // Update the button label
        musicToggleButton.textContent = "Play Music";
    }
});


// ========================================
// Volume Slider
// ========================================

musicVolumeSlider.addEventListener("input", () => 
{
    // Convert the slider value from 0–100 to 0.0–1.0
    const volume = Number(musicVolumeSlider.value) / 100;
    setBackgroundMusicVolume(volume);

});

