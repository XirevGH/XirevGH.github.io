// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected and running!');

    function loadHTML(file, elementId) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                initEventListeners();
            })
            .catch(error => console.error('Error loading the file:', error));
    }
    
    // Load the header, content, and footer
    loadHTML('../header.html', 'header-container');
    loadHTML('../bookkeeping.html', 'content-container');
    loadHTML('../footer.html', 'footer-container');


    
    let score = 0;


    function initEventListeners() {
        initScoreInputListeners();
        initNavbarListeners();
        
    }

    function initNavbarListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(event) {
                console.log("clicking");
                // Remove 'active' class from all links
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
                // Add 'active' class to the clicked link
                this.classList.add('active');
            });
        });
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
        } else {
            console.log('Invalid input value');
        }
    }
});