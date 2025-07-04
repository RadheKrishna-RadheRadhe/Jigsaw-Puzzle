var rows = 4;
var columns = 4;

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
    originalImage.style.width = "323px"; // Set size
    originalImage.style.height = "324px"; // Set size
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
    if (turns <= 20) {
        return "⭐⭐⭐⭐⭐";
    } else if (turns <= 25) {
        return "⭐⭐⭐⭐";
    } else if (turns <= 30) {
        return "⭐⭐⭐";
    } else if (turns <= 35) {
        return "⭐⭐";
    } else {
        return "⭐";
    }
}

var questions = [
    {
        question: "Why do rising sea levels threaten coastal communities?",
        options: ["They cause more ship traffic", "They improve marine life habitats", "They lead to flooding and erosion", "They raise fishing yields"],
        correct: 2,
        explanation: "Higher sea levels can flood coastal areas and erode shorelines."
    },
    {
        question: "How does planting trees help combat climate change?",
        options: ["Trees increase soil erosion", "Trees absorb carbon dioxide", "Trees reflect sunlight", "Trees release CFCs"],
        correct: 1,
        explanation: "Trees take in CO₂, reducing greenhouse gas levels."
    },
    {
        question: "What is renewable energy?",
        options: ["Energy from nonrenewable sources", "Energy only usable once", "Energy from sources that replenish naturally", "Energy that uses coal"],
        correct: 2,
        explanation: "Renewables like wind, solar, and hydro replenish naturally."
    },
    {
        question: "Which activity emits the least greenhouse gases?",
        options: ["Flying in a plane", "Cooking with gas", "Driving a car", "Riding a bicycle"],
        correct: 3,
        explanation: "Bicycles don’t burn fossil fuels, emitting almost no GHGs."
    },
    {
        question: "What does 'carbon offsetting' mean?",
        options: ["Balancing emissions by funding reductions elsewhere", "Measuring carbon footprints only", "Banning CO₂ emissions", "Releasing more carbon"],
        correct: 0,
        explanation: "Offsets compensate emissions by supporting reductions elsewhere."
    },
    {
        question: "Why is methane considered a powerful greenhouse gas?",
        options: ["It traps more heat per molecule than CO₂", "It cools the planet", "It evaporates quickly", "It is lighter than air"],
        correct: 0,
        explanation: "Methane traps significantly more heat than CO₂ molecule for molecule."
    },
    {
        question: "What is a climate tipping point?",
        options: ["A new type of renewable energy", "A threshold leading to irreversible changes", "A climate agreement goal", "A safe level of emissions"],
        correct: 1,
        explanation: "Tipping points are thresholds beyond which damage can’t be reversed."
    },
    {
        question: "Why do heatwaves increase under climate change?",
        options: ["Because of less sunshine", "Because of higher greenhouse gas concentrations", "Because wind speeds increase", "Because of more clouds"],
        correct: 1,
        explanation: "More GHGs trap heat, raising temperatures and heatwave frequency."
    },
    {
        question: "What effect does ice melt in Greenland have on oceans?",
        options: ["Raises sea level", "Increases ocean temperature only", "Makes oceans saltier", "Lowers sea level"],
        correct: 0,
        explanation: "Melting ice adds fresh water to oceans, raising sea levels."
    },
    {
        question: "How does climate change affect agriculture?",
        options: ["Causes unpredictable weather and reduced yields", "Eliminates pests", "Prevents droughts", "Enhances crop yields everywhere"],
        correct: 0,
        explanation: "Changing patterns can reduce yields and cause more droughts or floods."
    },
    {
        question: "What is the greenhouse effect?",
        options: ["Cooling by reflection", "Trapping of heat by atmospheric gases", "Absorption of sound waves", "UV radiation heating the Earth"],
        correct: 1,
        explanation: "Certain gases trap outgoing heat, warming the planet."
    },
    {
        question: "Why is reducing fossil fuel use important?",
        options: ["They absorb methane", "They cool the climate", "Fossil fuels are unlimited", "They produce CO₂ when burned"],
        correct: 3,
        explanation: "Burning fossil fuels releases CO₂, a major GHG."
    },
    {
        question: "What role do oceans play in climate regulation?",
        options: ["They release only methane", "They don’t affect climate", "They decrease rainfall", "They store heat and absorb CO₂"],
        correct: 3,
        explanation: "Oceans absorb heat and CO₂, moderating climate change."
    },
    {
        question: "How does using public transport help fight climate change?",
        options: ["It releases more GHGs", "It cuts individual CO₂ emissions", "It causes traffic jams", "It increases car use"],
        correct: 1,
        explanation: "Sharing rides reduces per-person emissions."
    },
    {
        question: "What is climate resilience?",
        options: ["Technology to cool down cities instantly", "Capacity to resist and recover from climate impacts", "Plan to relocate everyone", "Ability to increase emissions"],
        correct: 1,
        explanation: "Resilience is about adapting to and recovering from climate change."
    },
    {
        question: "Which gas is released by cutting down forests?",
        options: ["Carbon dioxide", "Oxygen", "Argon", "Nitrogen"],
        correct: 0,
        explanation: "Deforestation releases CO₂ stored in trees."
    },
    {
        question: "Why are coral reefs affected by climate change?",
        options: ["Ocean cooling", "Less sunlight", "More fish growth", "Ocean warming and acidification"],
        correct: 3,
        explanation: "Warmer, more acidic oceans stress reefs, causing bleaching."
    },
    {
        question: "What is 'carbon sequestration'?",
        options: ["Reducing oxygen production", "Releasing CO₂ into the atmosphere", "Storing CO₂ in trees, soil, or underground", "Measuring carbon in emissions"],
        correct: 2,
        explanation: "Sequestration stores CO₂ to reduce atmospheric concentrations."
    },
    {
        question: "How does switching to LED lighting help climate?",
        options: ["LEDs emit CO₂ directly", "LEDs are less efficient", "LEDs use more energy", "LEDs use less electricity"],
        correct: 3,
        explanation: "LED bulbs consume about 75% less energy than incandescent bulbs."
    },
    {
        question: "What international goal aims to limit warming to 1.5–2°C?",
        options: ["Montreal Protocol", "Kyoto Protocol", "Doha Amendment", "Paris Agreement"],
        correct: 3,
        explanation: "The Paris Agreement sets that global warming target."
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

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank2.jpg";
            tile.id = `board-tile-${r}-${c}`;
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            document.getElementById("board").append(tile);
        }
    }

    //Pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); // // Put "1" to "16" into the array (puzzle image names)
    }
    pieces.reverse();

    // Shuffle the pieces
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]]; // Shuffle
    }

    // Append shuffled pieces from the correct folder
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = `./${selectedFolder}/${pieces[i]}.jpg`;  // Use selected folder here


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
