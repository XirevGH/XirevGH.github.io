// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected and running!');

    // Select the button element
    const button = document.getElementById('clickMe');
    const output = document.getElementById('output');

    // Add a click event listener to the button
    button.addEventListener('click', () => {
        const message = 'Button clicked! 🎉';
        output.textContent = message;
        console.log(message);
    });
});