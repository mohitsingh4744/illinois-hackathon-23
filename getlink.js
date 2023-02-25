// Define a function to add the button to the player bar
function addButtonToPlayerBar() {
    // Get the player element
    const player = document.getElementById('movie_player');

    // Get the player bar element
    const playerBar = player.querySelector('.ytp-chrome-bottom');

    // Check if the player bar element exists
    if (playerBar) {
        // Create the button element
        const button = document.createElement('button');
        button.id = 'shortenButton';
        button.className = 'ytp-button';

        button.style.width = '48px';
        button.style.height = '48px';

        // Add the click event listener to the button
        button.addEventListener('click', () => {
            // Get the current video URL
            const videoUrl = window.location.href;

            // Send the video URL to the background script
            chrome.runtime.sendMessage({ type: 'process_url', url: videoUrl });
        });

        // Add the button to the player bar
        const rightControls = playerBar.querySelector('.ytp-right-controls');
        rightControls.insertBefore(button, rightControls.firstChild);

        // Create and add child element for image
        const scissors = document.createElement('img');
        scissors.src = chrome.runtime.getURL('images/Open.png');
        scissors.classList.add('playerButtonImage');
        button.appendChild(scissors);
    }
}

// Call the addButtonToPlayerBar function when the script is executed
addButtonToPlayerBar();

// Use a MutationObserver to watch for changes to the DOM
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the target element has been added to the DOM
            if (mutation.addedNodes[0] && mutation.addedNodes[0].classList.contains('ytp-right-controls')) {
                addButtonToPlayerBar();
            }
        }
    }
});

// Start observing changes to the DOM
observer.observe(document.documentElement, { childList: true, subtree: true });
