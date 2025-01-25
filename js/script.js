// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected and running!');


    const redThreeToNineInput = document.getElementById('redThreeToNine');
    const tenToKingInput = document.getElementById('tenToKing');
    const aceInput = document.getElementById('ace');
    const twoInput = document.getElementById('two');
    const blackThreeInput = document.getElementById('blackThree');

    const inputBoxes = document.querySelectorAll('.connectedTextField');

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

            inputBoxes.forEach(box => {
                if (box.id == "redThreeToNine") {
                    updateScore(redThreeToNineInput, 5);
                }
                if (box.id == "tenToKing") {
                    updateScore(tenToKingInput, 10);
                }
                if (box.id == "ace") {
                    updateScore(aceInput, 20);
                }
                if (box.id == "two") {
                    updateScore(twoInput, 25);
                }
                if (box.id == "blackThree") {
                    updateScore(blackThreeInput, 50);
                }

            })
            score = 0;
        })
    })
});