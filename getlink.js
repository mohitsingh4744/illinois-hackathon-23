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



        

        // Add the button to the player bar
        const rightControls = playerBar.querySelector('.ytp-right-controls');
        rightControls.insertBefore(button, rightControls.firstChild);

        // Create and add child element for image
        const scissors = document.createElement('img');
        scissors.src = chrome.runtime.getURL('images/Open.png');
        scissors.classList.add('playerButtonImage');
        // scissors.style.position = 'relative';
        // scissors.style.top = '-10px';
        button.appendChild(scissors);

        // Add the click event listener to the button
        //input all logic and methods in here
        button.addEventListener('click', () => {
            // Get the current video URL
            const videoUrl = window.location.href;

            // Define the time intervals to skip to
            const timeIntervals = [{'start': 0, 'end': 10000}, {'start': 463280.0, 'end': 483280.0}, {'start': 843760.0, 'end': 863760.0}, {'start': 639600.0, 'end': 659600.0}, {'start': 73520.0, 'end': 93520.0}, {'start': 110640.0, 'end': 130640.0}, {'start': 36400.0, 'end': 56400.0}, {'start': 129200.0, 'end': 149200.0}, {'start': 147760.0, 'end': 167760.0}, {'start': 658160.0, 'end': 678160.0}, {'start': 481840.0, 'end': 501840.0}, {'start': 92080.0, 'end': 112080.0}, {'start': 593200.0, 'end': 613200.0}, {'start': 862320.0, 'end': 882320.0}, {'start': 249840.0, 'end': 269840.0}];

            // Get the YouTube player element
            const player = document.getElementById('movie_player');

            timeIntervals.forEach((interval) => {
                player.seekTo(interval.start, true);
                player.playVideo();
        
                // Pause the video after the interval has ended
                setTimeout(() => {
                    player.pauseVideo();
                }, (interval.end - interval.start) * 1000);
            });

            if(scissors.src == chrome.runtime.getURL('images/Open.png')){
                scissors.src = chrome.runtime.getURL('images/close.png');
            }
            else{
                scissors.src = chrome.runtime.getURL('images/Open.png');
            }
            // Send the video URL to the background script
            chrome.runtime.sendMessage({ type: 'process_url', url: videoUrl });
            
        });
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
