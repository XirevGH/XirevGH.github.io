// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected and running!');

    const inputBoxes = document.querySelectorAll('.form-control');

    const output = document.getElementById('output');
    
    let score = 0;

    // Function to update the score
    function updateScore(inputElement, multiplier) {
        // Convert input value to an integer, default to 0 if invalid
        const value = parseInt(inputElement.value, 10);
        if (!isNaN(value)) { // Ensure value is a valid number
            score += value * multiplier; // Add the value to the score
            output.textContent = "Score: "
            output.textContent += score; // Update the displayed score
            console.log(score); // Log the updated score
        } else {
            console.log('Invalid input value');
        }
    }

    inputBoxes.forEach(inputBox => {
        inputBox.addEventListener('input', () => {
            console.log('Event triggered');
            inputBoxes.forEach(box => {
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
            score = 0;
        })
    })
});