var rows = 5;
var columns = 5;

var currTile;
var otherTile;
var turns = 0;
var isGameComplete = false; // Track game completion status

var folderExplanations = {
    "images": "This is a polar bear in the Arctic, struggling due to the melting sea ice.",
    "images2": "This is an endangered penguin colony, affected by changes in the Antarctic ecosystem.",
    "images3": "This image shows the rapid retreat of glaciers due to climate change.",
    "images4": "Melting icebergs like this contribute to rising sea levels.",
    "images5": "Polar bears rely on these icy hunting grounds, which are vanishing due to global warming.",
    "images6": "A polar bear wanders through a barren landscape, highlighting the devastating impact of climate change on Arctic habitats."
};

const facts = [
    "Arctic sea ice is declining at a rate of 13% per decade.",
    "Polar bears are listed as a vulnerable species due to climate change.",
    "The Arctic is warming twice as fast as the global average.",
    "Polar bears primarily hunt seals from sea ice platforms.",
    "Climate change is causing longer ice-free periods in the Arctic.",
    "Polar bears can swim for long distances, but this uses a lot of energy.",
    "The Arctic could be ice-free in summer by 2040.",
    "Polar bears are considered marine mammals because they spend most of their time on sea ice.",
    "Climate change affects the entire Arctic ecosystem, not just polar bears.",
    "Reducing carbon emissions is crucial for protecting Arctic habitats.",
    "Earth's temperature has risen 1.2°C since the 1800s.",
    "Oceans absorb 90% of heat, raising sea levels.",
    "The Arctic warms twice as fast, melting ice.",
    "Deforestation adds 10% of greenhouse gases.",
    "Extreme weather events are intensifying.",
    "Renewable energy is key to climate action.",
    "CO₂ levels are 50% higher than pre-industrial times.",
    "Climate change could displace 1 billion by 2050.",
    "Coral reefs face bleaching due to warm seas.",
    "Melting glaciers raise global sea levels.",
    "Air pollution and climate change are linked.",
    "Forests absorb a third of CO₂ emissions.",
    "Species face extinction as habitats shift.",
    "Crop yields may drop 30% by 2050.",
    "The Paris Agreement seeks a 1.5°C cap."
];

// Function to periodically display random facts in the fact-box
function showFacts() {
    const factTextElement = document.getElementById("fact-text");

    function updateFact() {
        // Select a random fact index
        const randomIndex = Math.floor(Math.random() * facts.length);
        // Show the selected random fact
        factTextElement.innerText = facts[randomIndex];
    }

    // Initial random fact display and then update every 10 seconds
    updateFact();
    setInterval(updateFact, 10000); // Change fact every 10 seconds
}

// Add this function to check if the puzzle is complete
function checkCompletion() {
    return correctPositions.every(position => position === true); // Ensure all positions are correct
}

// Function to show the original image, explanation, and stars after game completion
function showCompletionScreen(selectedFolder) {
    // Clear the board and pieces sections
    document.getElementById("board").innerHTML = "";
    document.getElementById("pieces").innerHTML = ""; // Remove puzzle pieces
    document.getElementById("pieces").style.display = "none"; // Hide the pieces after the puzzle is completed

    // Show the original image from the folder used
    let originalImage = document.createElement("img");
    originalImage.src = `./${selectedFolder}/pic.jpg`; // Original image path
    originalImage.style.width = "403px"; // Set size
    originalImage.style.height = "403px"; // Set size
    document.getElementById("board").appendChild(originalImage);

    // Show the explanation below the image
    let explanation = document.createElement("p");
    explanation.innerText = folderExplanations[selectedFolder]; // Display explanation
    explanation.style.color = "white"; // Set text color
    explanation.style.fontFamily = "Comfortaa"
    explanation.style.marginTop = "70px"; // Add spacing
    document.getElementById("board").appendChild(explanation);

    // Add a star rating based on the number of turns
    let starRating = getStarRating(turns);
    let starsDiv = document.createElement("div");
    starsDiv.style.marginTop = "60px"; // Add spacing for the stars
    starsDiv.innerHTML = `You earned: ${starRating} stars!`;
    starsDiv.style.color = "gold";
    starsDiv.style.fontSize = "24px";
    starsDiv.style.fontFamily = "Comfortaa";
    document.getElementById("board").appendChild(starsDiv);
}

// Function to calculate the star rating based on turns
function getStarRating(turns) {
    if (turns <= 40) {
        return "⭐⭐⭐⭐⭐";
    } else if (turns <= 45) {
        return "⭐⭐⭐⭐";
    } else if (turns <= 50) {
        return "⭐⭐⭐";
    } else if (turns <= 55) {
        return "⭐⭐";
    } else {
        return "⭐";
    }
}

var questions = [
    {
        question: "Why is methane bad for the Earth?",
        options: ["It causes storms", "It makes the Earth hotter", "It makes rain", "It makes clouds"],
        correct: 1,
        explanation: "Methane traps heat and makes the Earth warmer."
    },
    {
        question: "Why do trees help the climate?",
        options: ["They clean the air and take in carbon dioxide", "They blow cold air", "They trap oxygen", "They grow fruits"],
        correct: 0,
        explanation: "Trees take in carbon dioxide and help clean the air."
    },
    {
        question: "What is a carbon footprint?",
        options: ["The amount of CO₂ someone causes", "A bear track", "Footprints made from coal", "A black shoe print"],
        correct: 0,
        explanation: "It shows how much carbon dioxide a person or action adds to the air."
    },
    {
        question: "What is permafrost?",
        options: ["Ocean waves", "Frozen ground", "Sand", "Hot air"],
        correct: 1,
        explanation: "Permafrost is ground that stays frozen all year."
    },
    {
        question: "Why is too much carbon dioxide a problem?",
        options: ["It makes the sky green", "It cools the Earth", "It traps heat and warms the Earth", "It makes animals glow"],
        correct: 2,
        explanation: "Too much CO₂ traps heat and causes global warming."
    },
    {
        question: "What can happen when ice melts into the ocean?",
        options: ["It becomes colder", "The sea level goes up", "The ocean gets smaller", "The water disappears"],
        correct: 1,
        explanation: "Melting ice adds water to the ocean and raises sea levels."
    },
    {
        question: "What is one greenhouse gas?",
        options: ["Oxygen", "Water", "Carbon dioxide", "Sand"],
        correct: 2,
        explanation: "Carbon dioxide is a gas that traps heat and warms the planet."
    },
    {
        question: "What is global warming?",
        options: ["The Earth getting colder", "Only cities heating", "The Moon heating up", "The Earth getting warmer"],
        correct: 3,
        explanation: "Global warming means the Earth is getting hotter over time."
    },
    {
        question: "Why is the Arctic warming faster than other places?",
        options: ["It has no trees", "Melting ice makes it warmer", "More sunlight", "Animals there are warmer"],
        correct: 1,
        explanation: "Ice reflects sunlight. When it melts, more heat stays in the Arctic."
    },
    {
        question: "How can we help stop global warming?",
        options: ["Use more gas", "Turn off lights when not using them", "Leave the fan on", "Cut more trees"],
        correct: 1,
        explanation: "Turning off lights saves energy and helps the Earth."
    },
    {
        question: "What is sea ice?",
        options: ["Ice cream in the sea", "Cold clouds", "A fish", "Frozen ocean water"],
        correct: 3,
        explanation: "Sea ice is frozen water that floats on the ocean in cold places."
    },
    {
        question: "What is recycling good for?",
        options: ["Helping animals", "Saving energy and reducing waste", "Making more trash", "Melting ice"],
        correct: 1,
        explanation: "Recycling helps keep trash out of landfills and saves energy."
    },
    {
        question: "What happens to animals when the ice melts?",
        options: ["They freeze", "They grow wings", "They become plants", "They move or lose homes"],
        correct: 3,
        explanation: "Animals like polar bears lose hunting grounds when the ice melts."
    },
    {
        question: "What is a climate change 'tipping point'?",
        options: ["A snow hill", "A big change that can’t be undone", "A type of ice cream", "A place to rest"],
        correct: 1,
        explanation: "A tipping point is when Earth changes in a big way and can’t go back easily."
    },
    {
        question: "What is a greenhouse gas?",
        options: ["A gas that keeps heat close to Earth", "A gas from green leaves", "A balloon", "Air from flowers"],
        correct: 0,
        explanation: "Greenhouse gases trap heat in Earth's air."
    },
    {
        question: "What can you do to help the Earth?",
        options: ["Leave water running", "Use less plastic", "Drive short trips", "Keep lights on all day"],
        correct: 1,
        explanation: "Using less plastic helps keep the Earth clean."
    },
    {
        question: "Why is it bad when sea levels rise?",
        options: ["It brings more snow", "It floods cities", "It grows more trees", "More fish swim"],
        correct: 1,
        explanation: "Higher sea levels can flood homes near the coast."
    },
    {
        question: "What happens when frozen ground (permafrost) melts?",
        options: ["It releases gases into the air", "The ground gets higher", "It makes more ice", "Animals appear"],
        correct: 0,
        explanation: "Melting permafrost lets out gases like carbon dioxide and methane."
    },
    {
        question: "Which of these helps reduce pollution?",
        options: ["Burning leaves", "Driving everywhere", "Walking or biking", "Using more plastic"],
        correct: 2,
        explanation: "Walking or biking helps keep the air clean."
    },
    {
        question: "What is the main reason the Earth is getting warmer?",
        options: ["More sunlight", "More clouds", "More greenhouse gases", "Too much water"],
        correct: 2,
        explanation: "Greenhouse gases like carbon dioxide trap heat in Earth's air."
    }
];


function getRandomImageFolder() {
    const folders = ["images", "images2", "images3", "images4", "images5", "images6"];
    const randomIndex = Math.floor(Math.random() * folders.length);
    return folders[randomIndex];
}
var selectedFolder;

// For tracking correct placement of pieces
var correctPositions = Array(rows * columns).fill(false);

// Initialize timer variables
let seconds = 0;
let minutes = 0;

// Timer update function
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = formattedTime;
}

// Start the timer with a 1-second interval
const timerInterval = setInterval(updateTimer, 1000);

// Function to stop the timer when the puzzle is completed (add your completion check logic)
function stopTimer() {
    clearInterval(timerInterval);
}

window.onload = function () {
    selectedFolder = getRandomImageFolder();

    // Initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = `./${selectedFolder}/blank2.jpg`;  // Correct folder for blank image
            tile.id = `board-tile-${r}-${c}`;

            // Drag functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Pieces array
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); // Put "1" to "25" into the array (puzzle image names)
    }
    pieces.reverse();

    // Shuffle the pieces
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; // Swap pieces
    }

    // Append shuffled pieces from the correct folder
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = `./${selectedFolder}/${pieces[i]}.jpg`;  // Use selected folder for image path

        // Error handling for missing images
        tile.onerror = function () {
            console.error(`Failed to load image: ${tile.src}`);  // Log if image fails to load
        };



        tile.dataset.pieceNumber = pieces[i];

        // Drag functionality
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }

    // Start displaying facts
    showFacts();
}


// Add this function to select a random question
function getRandomQuestionIndex() {
    return Math.floor(Math.random() * questions.length);
}

// Dragging functions
function dragStart() {
    if (this.dataset.locked === "true") {
        return; // Prevent dragging if the tile is locked
    }
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    otherTile = this;
}

// Preload the placement sound
const placementSound = new Audio('./src_assets_puzzle.wav');

// Update the dragEnd function to check for game completion
function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;

    // Check if the move is valid
    if (isCorrectPosition(otherTile, currTile)) {
        // Swap images if valid
        currTile.src = otherImg;
        otherTile.src = currImg;

        // Mark the correct position and lock the tile
        let index = Array.prototype.indexOf.call(otherTile.parentNode.children, otherTile);
        correctPositions[index] = true;

        // Lock the current tile to prevent further moves
        currTile.dataset.locked = "true";
        otherTile.dataset.locked = "true";

        // Play the placement sound
        placementSound.play();

        turns += 1;
        document.getElementById("turns").innerText = turns;

        // ✅ Disable all tiles
        const tiles = document.querySelectorAll("#board img, #pieces img");
        tiles.forEach(tile => tile.style.pointerEvents = "none");

        // ✅ Show a random question after 1.5 sec delay
        let pieceIndex = getRandomQuestionIndex();
        setTimeout(() => {
            showQuestion(pieceIndex);

            // ✅ Re-enable all tiles
            tiles.forEach(tile => tile.style.pointerEvents = "auto");
        }, 1500);
    } else {
        // Move back to the pieces pile if incorrect
        turns += 1;
        document.getElementById("turns").innerText = turns;

        // Reset the currTile image using the selectedFolder
        currTile.src = `./${selectedFolder}/${currTile.dataset.pieceNumber}.jpg`;
    }

    // Check if the game is complete after every move
    if (checkCompletion() && !isGameComplete) {
        stopTimer();
        isGameComplete = true;
        showCompletionScreen(selectedFolder);

        const creditsButton = document.createElement("button");
        creditsButton.innerText = "Go to Credits";

        // Button Styling
        creditsButton.style.display = "block";
        creditsButton.style.margin = "60px auto 40px auto";
        creditsButton.style.padding = "12px 24px";
        creditsButton.style.fontSize = "18px";
        creditsButton.style.fontFamily = "Comfortaa";
        creditsButton.style.backgroundColor = "#FFD700";
        creditsButton.style.border = "none";
        creditsButton.style.borderRadius = "12px";
        creditsButton.style.cursor = "pointer";
        creditsButton.style.transition = "all 0.3s ease";

        // Hover Effects
        creditsButton.onmouseover = function () {
            creditsButton.style.backgroundColor = "#FFC107";
            creditsButton.style.transform = "scale(1.05)";
        };
        creditsButton.onmouseout = function () {
            creditsButton.style.backgroundColor = "#FFD700";
            creditsButton.style.transform = "scale(1)";
        };

        creditsButton.onclick = () => {
            window.location.href = "../../../Credits.html";
        };

        document.getElementById("board").appendChild(creditsButton);
    }
}


function isCorrectPosition(tile, draggedTile) {
    let tilePosition = Array.prototype.indexOf.call(tile.parentNode.children, tile);
    let draggedPosition = parseInt(draggedTile.dataset.pieceNumber) - 1; // Get the correct position from data attribute

    // Check if the position of the dragged tile matches the expected position
    return tilePosition === draggedPosition;
}

function isCorrectPosition(tile, draggedTile) {
    let tilePosition = Array.prototype.indexOf.call(tile.parentNode.children, tile);
    let draggedPosition = parseInt(draggedTile.dataset.pieceNumber) - 1; // Get the correct position from data attribute

    // Check if the position of the dragged tile matches the expected position
    return tilePosition === draggedPosition;
}

function showQuestion(index) {
    let question = questions[index];
    let attemptsLeft = 3;
    let answeredCorrectly = false;

    const overlay = document.getElementById("overlay");
    const questionSection = document.getElementById("question-section");
    const closeBtn = document.getElementById("close-btn");
    const explanationBox = document.getElementById("explanation");
    const optionsDiv = document.getElementById("options");

    overlay.style.display = "block";
    questionSection.style.display = "block";
    closeBtn.style.display = "none";
    explanationBox.style.display = "none";

    // Smooth fade-in
    setTimeout(() => {
        overlay.style.opacity = 1;
        questionSection.style.transform = "translate(-50%, -50%) scale(1)";
        questionSection.style.opacity = 1;
    }, 50);

    document.getElementById("question").innerText = question.question;
    optionsDiv.innerHTML = '';

    question.options.forEach((option, i) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.style.fontFamily = "Comfortaa";

        button.onclick = function () {
            if (attemptsLeft <= 0 || answeredCorrectly) return;

            attemptsLeft--;

            if (i === question.correct) {
                answeredCorrectly = true;

                button.style.backgroundColor = "#88E788";
                button.style.color = "black";

                Array.from(optionsDiv.children).forEach(child => {
                    child.disabled = true;
                    if (child !== button) child.style.display = "none";
                });

                explanationBox.innerHTML = `
                    <strong>✅ Great job! You're making a difference for the planet! 🌍💚</strong><br><br>
                    ${question.explanation}
                `;
                explanationBox.style.display = "block";
                closeBtn.style.display = "block";

            } else {
                button.style.backgroundColor = "red";
                button.style.color = "white";
                button.disabled = true;

                if (attemptsLeft === 0) {
                    Array.from(optionsDiv.children).forEach(child => {
                        child.disabled = true;
                        if (child !== optionsDiv.children[question.correct]) {
                            child.style.display = "none";
                        } else {
                            child.style.backgroundColor = "#88E788";
                            child.style.color = "black";
                        }
                    });

                    explanationBox.innerHTML = `
                        <strong>❌ You got all attempts wrong 😢</strong><br><br>
                        ${question.explanation}
                    `;
                    explanationBox.style.display = "block";
                    closeBtn.style.display = "block";
                }
            }
        };

        optionsDiv.appendChild(button);
    });
}


// ✅ Close button functionality (keep this outside showQuestion)
document.getElementById("close-btn").onclick = function () {
    const overlay = document.getElementById("overlay");
    const questionSection = document.getElementById("question-section");

    overlay.style.opacity = 0;
    questionSection.style.transform = "translate(-50%, -50%) scale(0.8)";
    questionSection.style.opacity = 0;

    setTimeout(() => {
        overlay.style.display = "none";
        questionSection.style.display = "none";
        document.getElementById("explanation").style.display = "none";

        // ✅ Hide the close button again
        document.getElementById("close-btn").style.display = "none";
    }, 500);
};
