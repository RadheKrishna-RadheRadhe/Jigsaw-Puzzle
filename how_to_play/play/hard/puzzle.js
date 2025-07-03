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
        question: "What is causing the polar bear’s ice to shrink?",
        options: ["Climate change", "Weight of polar bear", "Rains", "Using ice slides"],
        correct: 0,
        explanation: "The ice is melting because of climate change."
    },
    
    {
        question: "Why do polar bears need sea ice to live?",
        options: ["For playing games", "To hunt seals and travel", "For camping", "To keep their fur clean"],
        correct: 1,
        explanation: "Ice acts as a hunting ground for polar bears to hunt seals and also to travel."
    },

    {
        question: "What happens to polar bears when the sea ice melts too quickly?",
        options: ["Their population grows", "Finding food will be difficult for them", "Their eyes become green", "They become happy"],
        correct: 1,
        explanation: "They have to swim long distances and find it harder to find food."
    },

    {
        question: "What is one main reason for the ice caps melting?",
        options: ["Cold drinks", "Global warming", "Too much snow", "Weight of polar bears"],
        correct: 1,
        explanation: "The Earth is getting warmer because of too many greenhouse gases."
    },

    {
        question: "What can we do to help stop the ice from melting?",
        options: ["Reduce global warming", "Do not touch the ice", "Nothing", "Be optimistic"],
        correct: 0,
        explanation: "Reducing global warming stops the ice from melting."
    },

    {
        question: "Why are scientists concerned about the melting ice caps?",
        options: ["Because they want to find new continents", "Because of climate change and animals living there", "Because of not finding coffee there", "As doing research becomes difficult"],
        correct: 1,
        explanation: "It affects animals like polar bears and changes the climate."
    },

    {
        question: "What happens to polar bear food sources when ice melts?",
        options: ["Get doubled", "Become scarce", "They will not get affected", "Become enriched"],
        correct: 1,
        explanation: "Seals find it harder to live and the bears have less food."
    },

    {
        question: "What are greenhouse gases and how do they affect the climate?",
        options: ["They are gases that keep the planet warm, like a blanket", "They are gases that help the ice stay cold", "They are gases that make the air smell nice", "They are gases that help polar bears find food"],
        correct: 0,
        explanation: "They are gases that keep the planet warm, like a blanket."
    },

    {
        question: "What is one simple thing you can do at home to help fight climate change?",
        options: ["Turn off lights when you're not using them", "Leave the fridge door open to cool the house", "Use more plastic bags", "Drive a car with more emissions"],
        correct: 0,
        explanation: "Reducing the consumption of electricity will help in fighting against climate change."
    },

    {
        question: "Why is it important to learn about climate change and the polar bear’s situation?",
        options: ["To understand how our actions affect the planet and to find ways to help", "To see more polar bears on TV", "To find out how to play with polar bears", "To learn how to make ice sculptures"],
        correct: 0,
        explanation: "Understanding our impact can lead to effective solutions."
    },

    {
        question: "What is a significant consequence of climate change on polar bears' habitats?",
        options: ["Increase in polar bear population", "More icebergs", "Loss of breeding grounds due to melting ice", "Polar bears becoming more friendly"],
        correct: 2,
        explanation: "As the ice melts, polar bears lose crucial areas where they breed and care for their young, threatening their survival."
    },

    {
        question: "How does melting ice affect sea levels?",
        options: ["Sea levels rise due to melting ice", "Sea levels decrease due to melting ice", "Sea levels remain the same", "Sea levels rise only in winter"],
        correct: 0,
        explanation: "When ice caps and glaciers melt, they contribute to higher sea levels, which can lead to coastal flooding and erosion."
    },

    {
        question: "What role do polar bears play in the Arctic ecosystem?",
        options: ["They are the top predators, helping maintain balance in the food chain", "They are the primary producers in the ecosystem", "They have no impact on the ecosystem", "They only affect the land animals"],
        correct: 0,
        explanation: "As apex predators, polar bears help regulate the populations of their prey, like seals, which is vital for the health of the Arctic ecosystem."
    },

    {
        question: "What is the main cause of global climate change?",
        options: ["Burning fossil fuels", "Deforestation", "Volcanic eruptions", "Natural solar cycles"],
        correct: 0,
        explanation: "Burning fossil fuels releases large amounts of carbon dioxide, the main driver of climate change."
    },

    {
        question: "Which gas is most responsible for trapping heat in the Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
        correct: 2,
        explanation: "Carbon dioxide is the primary greenhouse gas emitted through human activities."
    },

    {
        question: "What percentage of the Earth's atmosphere is carbon dioxide?",
        options: ["0.04%", "1%", "5%", "10%"],
        correct: 0,
        explanation: "Carbon dioxide makes up about 0.04% of the atmosphere, but even this small amount has a major impact."
    },

    {
        question: "Which sector is the largest emitter of greenhouse gases globally?",
        options: ["Transportation", "Agriculture", "Energy", "Waste management"],
        correct: 2,
        explanation: "The energy sector, particularly electricity and heat production, is the largest source of greenhouse gas emissions."
    },
    {
        question: "What is the predicted rise in global temperature by 2100 if significant measures aren't taken?",
        options: ["1°C", "2-4°C", "4-6°C", "6-8°C"],
        correct: 1,
        explanation: "If no substantial action is taken, global temperatures are expected to rise between 2°C to 4°C by 2100."
    },
    {
        question: "Which of the following is NOT a consequence of climate change?",
        options: ["Rising sea levels", "Increased frequency of hurricanes", "Expansion of polar ice caps", "More intense heatwaves"],
        correct: 2,
        explanation: "Climate change is causing the polar ice caps to shrink, not expand."
    },
    {
        question: "What is ocean acidification?",
        options: ["The ocean becoming warmer", "Increase in ocean salinity", "The ocean absorbing CO2 and becoming more acidic", "The depletion of ocean oxygen levels"],
        correct: 2,
        explanation: "Ocean acidification occurs when CO2 is absorbed by seawater, making it more acidic and affecting marine life."
    },
    {
        question: "Which of the following countries emits the most carbon dioxide per capita?",
        options: ["China", "United States", "India", "Russia"],
        correct: 1,
        explanation: "The United States has one of the highest carbon emissions per capita, even though China emits the most in total."
    },
    {
        question: "What is the purpose of the Paris Agreement?",
        options: ["To limit global warming to below 2°C", "To eliminate all fossil fuel use", "To ban deforestation globally", "To provide climate refugees with resources"],
        correct: 0,
        explanation: "The Paris Agreement aims to limit global temperature rise to well below 2°C, with efforts to keep it to 1.5°C."
    },
    {
        question: "Which of these renewable energy sources is the most used worldwide?",
        options: ["Solar power", "Hydropower", "Wind power", "Geothermal energy"],
        correct: 1,
        explanation: "Hydropower is currently the largest source of renewable energy used worldwide."
    },
    {
        question: "What is the main reason for the shrinking of the Arctic ice cap?",
        options: ["Overfishing", "Melting due to rising temperatures", "Oil spills", "Changes in ocean currents"],
        correct: 1,
        explanation: "The Arctic ice cap is shrinking primarily due to rising global temperatures caused by climate change."
    },
    {
        question: "How does deforestation contribute to climate change?",
        options: ["It cools the planet by increasing albedo", "It increases carbon dioxide levels in the atmosphere", "It improves air quality", "It has no impact on climate change"],
        correct: 1,
        explanation: "Deforestation releases stored carbon dioxide, contributing to higher atmospheric CO2 levels."
    },
    {
        question: "Which of the following is a potential solution to climate change?",
        options: ["Using more coal", "Building sea walls", "Reducing greenhouse gas emissions", "Ignoring the problem"],
        correct: 2,
        explanation: "Reducing greenhouse gas emissions is the most effective way to mitigate climate change."
    },
    {
        question: "What is a carbon footprint?",
        options: ["A person's impact on local wildlife", "A measure of how much carbon a person or activity emits", "The carbon content of the air", "The footprint of carbon atoms in soil"],
        correct: 1,
        explanation: "A carbon footprint measures the total greenhouse gas emissions caused by an individual, organization, or activity."
    },
    {
        question: "What is the term for efforts to reduce or prevent the emission of greenhouse gases?",
        options: ["Adaptation", "Mitigation", "Resilience", "Restoration"],
        correct: 1,
        explanation: "Mitigation refers to actions taken to reduce or prevent the emission of greenhouse gases."
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

window.onload = function() {
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
        tile.onerror = function() {
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

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

// Preload the placement sound
const placementSound = new Audio('./src_assets_puzzle.wav');

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
        currTile.dataset.locked = "true"; // Lock the tile
        otherTile.dataset.locked = "true"; // Lock the other tile

        // Play the placement sound
        placementSound.play();

        turns += 1;
        document.getElementById("turns").innerText = turns;

        // Show a random question and disable the board
        let pieceIndex = getRandomQuestionIndex(); // Get a random question index
        showQuestion(pieceIndex);
    } else {
        // Move back to the pieces pile if incorrect
        turns += 1;
        document.getElementById("turns").innerText = turns;

        // Reset the currTile image using the selectedFolder
        currTile.src = `./${selectedFolder}/${currTile.dataset.pieceNumber}.jpg`; // Ensure the original folder is used
    }

    // Check if the game is complete after every move
    // Check if the game is complete after every move
    if (checkCompletion() && !isGameComplete) {
        stopTimer();
        isGameComplete = true;
        showCompletionScreen(selectedFolder);

        // Show redirect countdown
        const countdownMsg = document.createElement("div");
        countdownMsg.innerHTML = `
        <p style="color:white; font-family:Comfortaa; margin-top:40px; font-size:18px;" id="redirect-msg">
            Redirecting to credits page in <span id="countdown">10</span> seconds...
        </p>`;
        document.getElementById("board").appendChild(countdownMsg);

        // Countdown logic
        let countdown = 25;
        const countdownInterval = setInterval(() => {
            countdown--;
            document.getElementById("countdown").innerText = countdown;
            if (countdown === 0) clearInterval(countdownInterval);
        }, 1000);

        // Redirect to credits.html after 10 seconds
        setTimeout(() => {
            window.location.href = "../../../Credits.html";
        }, 25000);
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

    // Fade in the overlay and show the question section
    let overlay = document.getElementById("overlay");
    let questionSection = document.getElementById("question-section");

    overlay.style.display = "block"; // Make it visible
    questionSection.style.display = "block"; // Make question box visible

    // Trigger the fade-in animation
    setTimeout(() => {
        overlay.style.opacity = 1; // Smooth fade-in for overlay
        questionSection.style.transform = "translate(-50%, -50%) scale(1)"; // Zoom effect
        questionSection.style.opacity = 1; // Fade-in for question box
    }, 50); // Small delay to ensure CSS transition applies

    // Display the question and options
    document.getElementById("question").innerText = question.question;

    // Clear previous options
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';

    // Display options
    question.options.forEach((option, i) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.style.fontFamily = "Comfortaa";

        button.onclick = function() {
            // Disable the clicked option immediately
            button.disabled = true;

            if (i === question.correct) {
                // Change the color of the correct answer to green
                button.style.backgroundColor = "#88E788";
                button.style.color = "black";
                button.style.fontFamily = "Comfortaa";

                // Disable wrong options with fade-out
                Array.from(optionsDiv.children).forEach(child => {
                    if (child !== button) {
                        child.disabled = true; // Disable wrong options
                        child.style.display = "none"; // Optionally hide wrong options
                    }
                });

                document.getElementById("explanation").innerText = question.explanation;
                document.getElementById("explanation").style.display = "block";

                setTimeout(() => {
                    overlay.style.opacity = 0; // Smooth fade-out
                    questionSection.style.transform = "translate(-50%, -50%) scale(0.8)"; // Zoom out effect
                    questionSection.style.opacity = 0; // Fade-out for question box

                    // Hide elements after transition
                    setTimeout(() => {
                        overlay.style.display = "none";
                        questionSection.style.display = "none";
                        document.getElementById("explanation").style.display = "none"; // Hide explanation
                    }, 500); // Time after which elements are hidden
                }, 3000);
            } else {
                // Mark the wrong answer
                button.style.backgroundColor = "red";
                button.style.color = "white";
            }
        };
        optionsDiv.appendChild(button);
    });
}