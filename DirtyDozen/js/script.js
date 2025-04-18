// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected and running!');

    loadStartPage();

    async function loadHTML(file, elementId) {
        return fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                initEventListeners();
            })
            .catch(error => console.error('Error loading the file:', error));
    }
    
    // Load the header, content, and footer
    async function loadStartPage() {
        await loadHTML('../gamesetup.html', 'content-container');
    }

    const playerScores = new Map();
    let score = 0;
    let playerCount = 0;
    let playerNames = [];
    let currentPlayer = 0;
    let round = 0;

    function initEventListeners() {
        initStartButton();
        initScoreInputListeners();
        initNavbarListeners();
        initConfirmButton();
        initNextRoundButton();
        initPlayAgainButton();
    }

    async function initConfirmButton() { 
        const confirmButton = document.getElementById("confirm");
        if (!confirmButton) {
            return; // No error, just skip initialization
        }
        confirmButton.addEventListener('click', async () => {

            let currentPoints = playerScores.get(playerNames[currentPlayer]);
            playerScores.set(playerNames[currentPlayer], currentPoints + score);
            if (currentPlayer + 1 < playerCount){
                currentPlayer++;
                resetBookkeepingPage();
            }
            else {
                await loadHTML('../scoreboard.html', 'content-container');
                createScoreboard();
            }
        });
    }

    function createScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        const sortedPlayers = [...playerScores.entries()].sort((a, b) => b[1] - a[1]);
        sortedPlayers.forEach(([playerName, score]) => {
            const newRow = document.createElement('tr');
            const newNameData = document.createElement('td');
            const newScoreData = document.createElement('td');
            newNameData.textContent = playerName;
            newScoreData.textContent = score;
            scoreboard.append(newRow);
            newRow.append(newNameData, newScoreData);
        });
    }

    async function initNextRoundButton() {
        nextRoundButton = document.getElementById("start-round");
        if (!nextRoundButton) {
            return; // No error, just skip initialization
        }
        nextRoundButton.addEventListener('click', async () => { 
            await loadHTML('../bookkeeping.html', 'content-container');
            resetBookkeepingPage();
            round++;
            if (round == 9) {
                await loadHTML('../winner.html', 'content-container');
                let highestScore = 0;
                let winningPlayer = "";
                for(i = 0; i < playerScores.size; i++) {
                    if (playerScores.get(playerNames[i]) > highestScore) {
                        highestScore = playerScores.get(playerNames[i]);
                        winningPlayer = playerNames[i];
                    }
                }
                console.log("The winner is " + winningPlayer + " with " + highestScore + " points!");
                document.getElementById("winner").textContent = "The winner is " + winningPlayer + " with " + highestScore + " points!";
            }
            else {
                setNavbarButtonState(round - 1, false);
                currentPlayer = 0;
                resetBookkeepingPage();
                setNavbarButtonState(round, true);
                document.getElementById("title").textContent = "Round " + round;
            }
        });
    }

    async function resetBookkeepingPage() {
        window.scrollTo(0, 0);
        document.getElementById("enter-cards").textContent = "Enter " + playerNames[currentPlayer] + "'s cards:";
        document.querySelectorAll('.form-control').forEach(inputBox => { 
            inputBox.value = "";
        });
        const output = document.getElementById('output');
        score = 0;
        output.textContent = "Score: 0";
    }

    async function initPlayAgainButton() {
        const playAgainButton = document.getElementById("play-again");
        if (!playAgainButton) {
            return; // No error, just skip initialization
        }
        playAgainButton.addEventListener('click', async () => { 
            location.reload(false);
        });
    }

    async function initStartButton() {
        const startButton = document.getElementById("start");
        const playerCountInput = document.getElementById("playerCount");

        if (!startButton || !playerCountInput) {
            return; // No error, just skip initialization
        }

        startButton.addEventListener('click', async () => {
            playerCount = parseInt(playerCountInput.value, 10);
            await loadHTML('../header.html', 'header-container');
            await loadHTML('../playersetup.html', 'content-container');
            createPlayerSetupPage();
        });
    }

    async function initStartGameButton() {
        const startButton = document.getElementById("startgame");
        startButton.addEventListener('click', async () => {
            for (i = 0; i < playerCount; i++) {
                if (document.getElementById("player" + i + "name").value != "") {
                    let name = document.getElementById("player" + i + "name").value
                    playerNames.push(name);
                    playerScores.set(name, 0);
                }
            }
            
            if (!startButton || !playerNames) {
                return; // No error, just skip initialization
            }
            if (playerNames.length == playerCount) {
                round++;
                setNavbarButtonState(1, true);
                await loadHTML('../bookkeeping.html', 'content-container');
                document.getElementById("title").textContent = "Round " + round;
                document.getElementById("enter-cards").textContent = "Enter " + playerNames[currentPlayer] + "'s cards:";
            }
            else {
                playerNames = [];
            }
        });
    }

    function createPlayerSetupPage() {
        // 1. Ensure the element with id="section" exists in your HTML
        const container = document.getElementById('section');
        
        // Check if container exists to prevent "null" errors
        if (!container) {
          console.error('Element with id="section" not found!');
          return;
        }
      
        // 2. Verify that "playerCount" is a defined number
        if (typeof playerCount === 'undefined' || !Number.isInteger(playerCount)) {
          console.error('Invalid or undefined "playerCount" value');
          return;
        }
      
        console.log(`Creating setup for ${playerCount} playerCount`);
      
        // 3. Always declare variables with let/const
        for (let i = 0; i < playerCount; i++) {
          // Player label
          const newText = document.createElement('p');
          newText.textContent = `Player ${i + 1}`; // Start numbering from 1 instead of 0
      
          // Input field
          const newInput = document.createElement('input');
          newInput.className = 'col-8 offset-2';
          newInput.id = `player${i}name`; // Template literals are cleaner
          newInput.placeholder = `Name of Player ${i + 1}`;
      
          // Append elements
          container.append(newText, newInput); // Append both at once
        }
        newButton = document.createElement('button');
        newButton.className = "clickMe";
        newButton.id = 'startgame';
        newButton.textContent = 'Start Game';
        container.append(newButton);
        initStartGameButton();
      }

    function initNavbarListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {

            link.addEventListener('click', function(event) {

                // Remove 'active' class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    const idParts = link.id.split('-');
                    const idNumber = parseInt(idParts[1]);
                    if(idNumber <= round) {
                        link.classList.remove('disabled');
                        link.classList.remove('selected');
                        link.classList.add('bg-secondary'); 
                    }

                });
    
                // Add 'active' class to the clicked link
                this.classList.remove('bg-secondary'); 
                this.classList.add('selected');
            });
        });
    }

    function setNavbarButtonState(index, state) {
        button = document.getElementById("round-" + index);
        if (!button) {
            console.error(`Button with ID 'round-${index}' not found`);
            return;
        }
        if (state) {
            button.classList.remove('disabled');
            button.classList.add('active');
            button.classList.add('selected');
        }
        else {
            button.classList.remove('disabled');
            button.classList.remove('selected');
            button.classList.add('active');
            button.classList.add('bg-secondary');
        }
        
    }
    

    function initScoreInputListeners() {
        document.querySelectorAll('.form-control').forEach(inputBox => {
            inputBox.addEventListener('input', () => {
                score = 0;
                document.querySelectorAll('.form-control').forEach(box => {
                    if (box.id == "redThreeToNinePos") {
                        updateScore(box, 5);
                    }
                    if (box.id == "tenToKingPos") {
                        updateScore(box, 10);
                    }
                    if (box.id == "acePos") {
                        updateScore(box, 20);
                    }
                    if (box.id == "twoPos") {
                        updateScore(box, 25);
                    }
                    if (box.id == "blackThreePos") {
                        updateScore(box, 50);
                    }
                    if (box.id == "redThreeToNineNeg") {
                        updateScore(box, -5);
                    }
                    if (box.id == "tenToKingNeg") {
                        updateScore(box, -10);
                    }
                    if (box.id == "aceNeg") {
                        updateScore(box, -20);
                    }
                    if (box.id == "twoNeg") {
                        updateScore(box, -25);
                    }
                    if (box.id == "blackThreeNeg") {
                        updateScore(box, -50);
                    }
                })
            })
        })
    }

    // Function to update the score
    function updateScore(inputElement, multiplier) {
        // Convert input value to an integer, default to 0 if invalid
        const value = parseInt(inputElement.value, 10);
        const output = document.getElementById('output');
        if (!isNaN(value)) { // Ensure value is a valid number
            score += value * multiplier; // Add the value to the score
            output.textContent = "Score: "
            output.textContent += score; // Update the displayed score
            console.log(score); // Log the updated score
        }
    }
});