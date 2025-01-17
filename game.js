const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];

let started = false;
let level = 0;

//Detect Enter Key to start the game
function startGame() {
    document.getElementById("title-game").textContent = "Level 1";
    nextSequence();
    started = true;
    document.body.classList.remove("game-over");
    document.body.classList.add("body");
    setTimeout(() => {
        document.getElementById('btnStart').style.visibility = 'hidden';
    }, 100);
}

//Detect when button is clicked
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        if (!started) return; // Ignore clicks if the game has not started

        let userChosenColor = this.id; 
        userPattern.push(userChosenColor);

        //Play the sound
        playSound(userChosenColor);

        //Check if correct pattern
        checkAnswer(userPattern.length - 1);
    });
});

//Play the sound
function playSound (color) {
    let soundEffect = new Audio("./sounds/" + color + ".mp3");
    soundEffect.play();
}

//Press button animation
function animatePress(currentColour) {
    //Add button effect
    document.getElementById(currentColour).classList.add("pressed");
    // Remove the class after 200 milliseconds
    setTimeout(() => {
        document.getElementById(currentColour).classList.remove("pressed");
    }, 200);
}


//Next sequence pattern
function nextSequence() {
    userPattern = []; // Clear user input for the next round
    level++;
    document.getElementById("title-game").textContent = "Level " + level;

    //Select random color
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Show the full pattern
    let delay = 400; // Start with no delay
    gamePattern.forEach((color) => {
        setTimeout(() => {
            animatePress(color);
            playSound(color);
        }, delay);

        delay += 600; // Increase delay for the next color in the sequence
    });
}

//Checks the patterns
function checkAnswer(currentIndex) {
    if (userPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); // Move to the next sequence
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("title-game").textContent = "Game Over.";
        setTimeout(() => {
            document.getElementById('btnStart').style.visibility = 'visible';
        }, 100);       

        startOver();
    }
}

//Start over the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;    
}