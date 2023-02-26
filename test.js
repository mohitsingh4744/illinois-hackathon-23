/*
// Extract YouTube video ID from URL
function get_video_id(link) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    //var match = url.match(regExp);
    //return (match&&match[7].length==11)? match[7] : false;
    /*const query = new URL(link).searchParams;
    if (query.get('v')) {
      return query.get('v');
    } else if (link.includes('youtu.be/')) {
      return link.split('youtu.be/')[1];
    } else if (link.includes('/embed/')) {
      return link.split('/embed/')[1];
    } else if (link.includes('/v/')) {
      return link.split('/v/')[1];
    } else {
      return null;
    }
  }
  
  // Get transcript of YouTube video
  async function get_transcript(vid_id) {
    const response = await fetch(`https://www.youtube.com/watch?v=${vid_id}`);
    const html = await response.text();
    const player_response = html.split('ytInitialPlayerResponse = ')[1].split(';</script>')[0];
    const transcript_response = JSON.parse(player_response).captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;
    const transcript = await fetch(transcript_response);
    return transcript.text();
  }
  
  // Finds the index of each minute marker from 0 until the end
  function find_minute_markers(transcript) {
    const df = JSON.parse(transcript);
    const start_list = df.map(row => Math.floor(row.start / 60));
    const min_list = [0];
    for (let i = 0; i <= Math.max(...start_list); i++) {
      min_list.push(start_list.indexOf(i, min_list[min_list.length-1]+1));
    }
    return min_list;
  }
  
  // Cuts transcript into segments based on every minute
  function cut_transcript(transcript, min_list) {
    console.log(transcript.slice(min_list[1], min_list[2]));
  }
  
  // From YouTube video ID, visit the website and extract most viewed points
  async function viewedPoints(video_id) {
    const url = `https://yt.lemnoslife.com/videos?part=mostReplayed&id=${video_id}`;
    const response = await fetch(url);
    const data = await response.json();
    const longlist = data.items[0].mostReplayed.heatMarkers;
    const df_list = longlist.map(i => i.heatMarkerRenderer);
    return df_list;
  }

// finds the index of each minute marker from 0 till end
function find_minute_markers(transcript) {
    const df = pd.DataFrame(transcript);
    df['start_edit'] = df['start'] / 60;
    const start_list = df['start_edit'].tolist();
    const min_list = [0];
    for (let i = 0; i < Math.floor(df['start_edit'].max() + 1); i++) {
      min_list.push(np.searchsorted(start_list, i, 'right'));
    }
    return min_list;
  }
// cut transcript cuts based on every minute
function cut_transcript(transcript, min_list) {
  console.log(transcript.slice(min_list[1], min_list[2]));
}

// from youtube id visit the website and extract most viewed points (convert miliseconds to timestamp? function)
async function viewedPoints(video_id) {
  const url =
    'https://yt.lemnoslife.com/videos?part=mostReplayed&id=' + video_id;
  const { data } = await urlopen(url);
  const html_bytes = data.toString();
  const html = JSON.parse(html_bytes);
  const longlist = html.items[0].mostReplayed.heatMarkers;
  const df_list = [];
  for (let i of longlist) {
    df_list.push(i.heatMarkerRenderer);
  }
  return json_normalize(df_list);
}

function mostViewedPoints(df) {
    const num_points = df.timeRangeStartMillis.max() / 60000;
    const mark_dur = df.loc[0].markerDurationMillis;
    const range_ex = Math.floor(10000 / mark_dur);
    df['og_index'] = df.index;
    df = df.sort_values('heatMarkerIntensityScoreNormalized', false).head(num_points * 3);
    let index = 0;
    let i = 0;
    const point_medians = [];
    const exclude_points = [];
    while (i < num_points) {
      const local = df.loc[index].og_index;
      if (!exclude_points.includes(local)) {
        point_medians.push(local);
        for (let j = local - range_ex; j <= local + range_ex; j++) {
          exclude_points.push(j);
        }
        i++;
      }
      index++;
    }
    const time_stamps = [];
    if (point_medians.includes(0)) {
      time_stamps.push({ start: 0, end: 10000 });
      point_medians.splice(point_medians.indexOf(0), 1);
    }
    for (const i of point_medians) {
      const start = mark_dur * i - 10000;
      const end = mark_dur * i + 10000;
      time_stamps.push({ start: start, end: end });
    }
    return time_stamps;
  }
 
  const videoUrl = window.location.href;

  let t = find_minute_markers(get_transcript(get_video_id(videoUrl)))
  let listy = viewedPoints(t)
  console.log(mostViewedPoints(listy))

*/


/*function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }
  
  test.use(corsMiddleware);
*/
//const cors = require("cors");
//app.use(cors());

function get_video_id(link) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
    /*const query = new URL(link).searchParams;
    if (query.get('v')) {
      return query.get('v');
    } else if (link.includes('youtu.be/')) {
      return link.split('youtu.be/')[1];
    } else if (link.includes('/embed/')) {
      return link.split('/embed/')[1];
    } else if (link.includes('/v/')) {
      return link.split('/v/')[1];
    } else {
      return null;
    }*/
  }
  
  // Get transcript of YouTube video
  /*async function get_transcript(vid_id) {
    const response = await fetch(`https://www.youtube.com/watch?v=${vid_id}`);
    const html = await response.text();
    const player_response = html.split('ytInitialPlayerResponse = ')[1].split(';</script>')[0];
    const transcript_response = JSON.parse(player_response).captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;
    const transcript = await fetch(transcript_response);
    return transcript.text();
  }*/
  async function viewed_points(video_id) {
    const url = `https://yt.lemnoslife.com/videos?part=mostReplayed&id=${video_id}`;
    const response = await fetch(url);
    const data = await response.json();
    const longlist = data.items[0].mostReplayed.heatMarkers;
    const df_list = longlist.map(i => i.heatMarkerRenderer);
    let a = 0;
    while (a < df_list.length) {
        a++
    }
    const num_points = Math.floor(Math.max(...df_list.map(row => row.timeRangeStartMillis)) / 60000);
    const mark_dur = df_list[0].markerDurationMillis;
    const range_ex = Math.floor(10000 / mark_dur);
  
    df_list.forEach((row, i) => row.og_index = i);
    df_list.sort((a, b) => b.heatMarkerIntensityScoreNormalized - a.heatMarkerIntensityScoreNormalized);
    //const num_rows = num_points * 3;
    const point_medians = [];
    const exclude_points = [];
    let i = 0;
    let index = 0;
    while (i < num_points) {
      const local = df_list[index].og_index;
      if (!exclude_points.includes(local)) {
        point_medians.push(local);
        for (let j = local - range_ex; j <= local + range_ex; j++) {
          exclude_points.push(j);
        }
        i++;
      }
      index++;
    }
  
    const time_stamps = [];
    if (point_medians.includes(0)) {
      time_stamps.push({ start: 0, end: 10000 });
      point_medians.splice(point_medians.indexOf(0), 1);
    }
    point_medians.forEach(i => {
      const start = mark_dur * i - 10000;
      const end = mark_dur * i + 10000;
      time_stamps.push({ start, end });
    });
    //console.log(time_stamps);
    return time_stamps;
  }
  /*function most_viewed_points(data) {
    console.log(data)

    //console.log(data instanceof Array);
    /*data.forEach(function(value, key) {
        console.log(key + " = " + value);
    })*/
    /*const num_points = Math.max(...data.map(row => row.timeRangeStartMillis)) / 60000;
    const mark_dur = data[0].markerDurationMillis;
    const range_ex = Math.floor(10000 / mark_dur);
  
    data.forEach((row, i) => row.og_index = i);
    data.sort((a, b) => b.heatMarkerIntensityScoreNormalized - a.heatMarkerIntensityScoreNormalized);
    const num_rows = num_points * 3;
    const point_medians = [];
    const exclude_points = [];
    let i = 0;
  
    while (i < num_points) {
      const local = data[index].og_index;
      if (!exclude_points.includes(local)) {
        point_medians.push(local);
        for (let j = local - range_ex; j <= local + range_ex; j++) {
          exclude_points.push(j);
        }
        i++;
      }
      index++;
    }
  
    const time_stamps = [];
    if (point_medians.includes(0)) {
      time_stamps.push({ start: 0, end: 10000 });
      point_medians.splice(point_medians.indexOf(0), 1);
    }
    point_medians.forEach(i => {
      const start = mark_dur * i - 10000;
      const end = mark_dur * i + 10000;
      time_stamps.push({ start, end });
    });
  
    return time_stamps;
    
  }*/

  let url = "https://www.youtube.com/watch?v=juzkwPa_1Xc&t=81s"
  let t = get_video_id(url)
  console.log(viewed_points(t))
  //most_viewed_points(df_local)
 //console.log(most_viewed_points(t))
  