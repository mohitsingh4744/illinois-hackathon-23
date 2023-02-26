


// Define a function to add the button to the player bar
function addButtonToPlayerBar(timestamps) {
    console.log(timestamps)
    // Get the player element
    let player = document.getElementById('movie_player');

    // Get the player bar element
    let playerBar = player.querySelector('.ytp-chrome-bottom');

    // Check if the player bar element exists
    if (playerBar) {
        // Create the button element
        let button = document.createElement('button');
        button.id = 'shortenButton';
        button.className = 'ytp-button';

        button.style.width = '48px';
        button.style.height = '48px';



        

        // Add the button to the player bar
        let rightControls = playerBar.querySelector('.ytp-right-controls');
        rightControls.insertBefore(button, rightControls.firstChild);

        // Create and add child element for image
        let scissors = document.createElement('img');
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
        
            // Define the time intervals to skip to
            let timeIntervals = [{'start': 0, 'end': 10000}, {'start': 463280.0, 'end': 483280.0}, {'start': 843760.0, 'end': 863760.0}, {'start': 639600.0, 'end': 659600.0}, {'start': 73520.0, 'end': 93520.0}, {'start': 110640.0, 'end': 130640.0}, {'start': 36400.0, 'end': 56400.0}, {'start': 129200.0, 'end': 149200.0}, {'start': 147760.0, 'end': 167760.0}, {'start': 658160.0, 'end': 678160.0}, {'start': 481840.0, 'end': 501840.0}, {'start': 92080.0, 'end': 112080.0}, {'start': 593200.0, 'end': 613200.0}, {'start': 862320.0, 'end': 882320.0}, {'start': 249840.0, 'end': 269840.0}];

            // Sort the intervals by start time
            timestamps.sort(function(a, b) {
                return a.start - b.start;
            });

            // Iterate over the time intervals and calculate the percentage of each interval and the space between intervals
            let prevEnd = 0;
            let resultString = '';
            timestamps.forEach(interval => {
                let intervalStartPercent = Math.floor((interval.start / videoDuration)*100);
                let intervalEndPercent = Math.floor((interval.end / videoDuration)*100);
                let intervalSpaceStartPercent = prevEnd;
                let intervalSpaceEndPercent = intervalStartPercent;
                resultString += `, transparent ${intervalSpaceStartPercent}%, transparent ${intervalSpaceEndPercent}%, blue ${intervalStartPercent}%, blue ${intervalEndPercent}%`
                prevEnd = intervalEndPercent;
            });
            console.log(resultString);

        
            // Toggle the button image
            

            let scissors = button.querySelector('.playerButtonImage');
            if(scissors.src == chrome.runtime.getURL('images/Open.png')){
                scissors.src = chrome.runtime.getURL('images/close.png');
                
                let playerBar = player.querySelector('.ytp-progress-bar');
                playerBar.style.background = `linear-gradient(to right${resultString})`;

                            
            }
            else{
                scissors.src = chrome.runtime.getURL('images/Open.png');

                let playerBar = player.querySelector('.ytp-progress-bar');
                            playerBar.style.background = '';
            }
        
            // Send the video URL to the background script
            chrome.runtime.sendMessage({ type: 'process_url', url: videoUrl });
        });
        ;
    }
}

// Call the addButtonToPlayerBar function when the script is executed




function get_video_id(link) {

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

async function viewed_points(video_id) {
    let url = `https://yt.lemnoslife.com/videos?part=mostReplayed&id=${video_id}`;
    let response = await fetch(url);
    let data = await response.json();
    let longlist = data.items[0].mostReplayed.heatMarkers;
    let df_list = longlist.map(i => i.heatMarkerRenderer);
    let a = 0;
    while (a < df_list.length) {
        a++
    }
    let num_points = Math.floor(Math.max(...df_list.map(row => row.timeRangeStartMillis)) / 60000);
    let mark_dur = df_list[0].markerDurationMillis;
    let range_ex = Math.floor(10000 / mark_dur);
  
    df_list.forEach((row, i) => row.og_index = i);
    df_list.sort((a, b) => b.heatMarkerIntensityScoreNormalized - a.heatMarkerIntensityScoreNormalized);
    //let num_rows = num_points * 3;
    let point_medians = [];
    let exclude_points = [];
    let i = 0;
    let index = 0;
    while (i < num_points) {
      let local = df_list[index].og_index;
      if (!exclude_points.includes(local)) {
        point_medians.push(local);
        for (let j = local - range_ex; j <= local + range_ex; j++) {
          exclude_points.push(j);
        }
        i++;
      }
      index++;
    }
  
    let time_stamps = [];
    if (point_medians.includes(0)) {
      time_stamps.push({ start: 0, end: 10000 });
      point_medians.splice(point_medians.indexOf(0), 1);
    }
    point_medians.forEach(i => {
      let start = mark_dur * i - 10000;
      let end = mark_dur * i + 10000;
      time_stamps.push({ start, end });
    });
    //console.log(time_stamps);
    addButtonToPlayerBar(time_stamps)
  }

  function deleteOldButtons(){
    let buttons = document.querySelectorAll("#shortenButton")
    console.log(buttons)
    buttons.forEach(button=>{
        document.removeChild(button)
    })
  }
function run(){
  console.log('change');
  deleteOldButtons();
  let videoUrl = window.location.href;

  let stringURL = videoUrl.toString();

  viewed_points(get_video_id(stringURL))
    // your youtube extention logic 
    
}
    
window.onload = run;
window.addEventListener('yt-navigate-start', run,   true);
//window.location.href=base_url+"main?parameter=true";
  /*let videoUrl = window.location.href;

  let stringURL = videoUrl.toString();

  viewed_points(get_video_id(stringURL))

  window.onhashchange = function() { 
    //code
    deleteOldButtons()
    let videoUrl = window.location.href;

    let stringURL = videoUrl.toString();

    viewed_points(get_video_id(stringURL));  
}

window.onpopstate = function() { 
    //code
    deleteOldButtons()
    let videoUrl = window.location.href;

    let stringURL = videoUrl.toString();

    viewed_points(get_video_id(stringURL));
}
/*document.addEventListener('spfdone', function() {
  // do stuff
  deleteOldButtons()
  let videoUrl = window.location.href;

  let stringURL = videoUrl.toString();

  viewed_points(get_video_id(stringURL));
});
/*window.addEventListener('hashchange', function(){
    
    let videoUrl = window.location.href;

    let stringURL = videoUrl.toString();

    viewed_points(get_video_id(stringURL))

})*/    
