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

        let videoDurationString = document.querySelector(".ytp-time-duration").innerHTML
        let minutes = parseInt(videoDurationString.substring(0, videoDurationString.indexOf(":")))
        let seconds = (minutes * 60) + parseInt(videoDurationString.substring(videoDurationString.indexOf(":")+1))
        let videoDuration = seconds * 1000;
        //first is 10 seconds
        //each after is 20 seconds



        button.addEventListener('click', () => {
            // Get the current video URL
            const videoUrl = window.location.href;
        
            // Define the time intervals to skip to
            const timeIntervals = [{'start': 0, 'end': 10000}, {'start': 463280.0, 'end': 483280.0}, {'start': 843760.0, 'end': 863760.0}, {'start': 639600.0, 'end': 659600.0}, {'start': 73520.0, 'end': 93520.0}, {'start': 110640.0, 'end': 130640.0}, {'start': 36400.0, 'end': 56400.0}, {'start': 129200.0, 'end': 149200.0}, {'start': 147760.0, 'end': 167760.0}, {'start': 658160.0, 'end': 678160.0}, {'start': 481840.0, 'end': 501840.0}, {'start': 92080.0, 'end': 112080.0}, {'start': 593200.0, 'end': 613200.0}, {'start': 862320.0, 'end': 882320.0}, {'start': 249840.0, 'end': 269840.0}];

            // Sort the intervals by start time
            timeIntervals.sort(function(a, b) {
                return a.start - b.start;
            });

            // Iterate over the time intervals and calculate the percentage of each interval and the space between intervals
            let prevEnd = 0;
            let resultString = '';
            timeIntervals.forEach(interval => {
                const intervalStartPercent = Math.floor((interval.start / videoDuration)*100);
                const intervalEndPercent = Math.floor((interval.end / videoDuration)*100);
                const intervalSpaceStartPercent = prevEnd;
                const intervalSpaceEndPercent = intervalStartPercent;
                resultString += `, transparent ${intervalSpaceStartPercent}%, transparent ${intervalSpaceEndPercent}%, blue ${intervalStartPercent}%, blue ${intervalEndPercent}%`
                prevEnd = intervalEndPercent;
            });
            console.log(resultString);

        
            // Toggle the button image
            

            const scissors = button.querySelector('.playerButtonImage');
            if(scissors.src == chrome.runtime.getURL('images/Open.png')){
                scissors.src = chrome.runtime.getURL('images/close.png');
                
                const playerBar = player.querySelector('.ytp-progress-bar');
                playerBar.style.background = `linear-gradient(to right${resultString})`;

                            
            }
            else{
                scissors.src = chrome.runtime.getURL('images/Open.png');

                const playerBar = player.querySelector('.ytp-progress-bar');
                            playerBar.style.background = '';
            }
        
            // Send the video URL to the background script
            chrome.runtime.sendMessage({ type: 'process_url', url: videoUrl });
        });
        ;
    }
}

// Call the addButtonToPlayerBar function when the script is executed
addButtonToPlayerBar();

