import urllib.parse
from youtube_transcript_api import YouTubeTranscriptApi
import json
import pandas as pd
from pandas import json_normalize
import numpy as np
from urllib.request import urlopen
#extract youtube id function
def get_video_id(link):
    query = urllib.parse.urlparse(link)
    if query.hostname == 'youtu.be':
        return query.path[1:]
    if query.hostname in ('www.youtube.com', 'youtube.com'):
        if query.path == '/watch':
            p = urllib.parse.parse_qs(query.query)
            return p['v'][0]
        if query.path[:7] == '/embed/':
            return query.path.split('/')[2]
        if query.path[:3] == '/v/':
            return query.path.split('/')[2]
    # fail?
    return None

#get transcript of video
def get_transcript(vid_id):
    transcript = YouTubeTranscriptApi.get_transcript("vz4Xf1QlYm8")
    #print(type(transcript))
    return transcript
#finds the index of each minute marker from 0 till end
def find_minute_markers(transcript):
    df = pd.DataFrame(transcript)
    df['start_edit'] = df['start'] // 60
    start_list = df['start_edit'].tolist()
    min_list = [0]
    for i in range(int(df['start_edit'].max() + 1)):
        min_list.append(np.searchsorted(start_list, i, side='right'))
    return(min_list)

#cut transcript cuts based on every minute
def cut_transcript(transcript, min_list):
    print(transcript[min_list[1]:min_list[2]])

#from youtube id visit the website and extract most viewed points (convert miliseconds to timestamp? function)
def viewedPoints(video_id):
    url = "https://yt.lemnoslife.com/videos?part=mostReplayed&id=" + video_id
    page = urlopen(url)
    html_bytes = page.read()
    html = json.loads(html_bytes.decode("utf-8"))
    longlist = html["items"][0]["mostReplayed"]["heatMarkers"]
    df_list = []
    for i in longlist:
        df_list.append(i["heatMarkerRenderer"])
    return(pd.DataFrame(df_list))

def mostViewedPoints(df):
    num_points = df['timeRangeStartMillis'].max() // 60000
    mark_dur = df.loc[0].markerDurationMillis
    range_ex = int(10000 // mark_dur)
    df['og_index'] = df.index
    #df = df.sort_values(by=['heatMarkerIntensityScoreNormalized'], ascending = False, ignore_index = True)
    df = df.sort_values(by=['heatMarkerIntensityScoreNormalized'], ascending = False, ignore_index = True).head(n=num_points*3)
    index = 0
    i = 0
    point_medians = []
    exclude_points = []
    while i < num_points:
        local = int(df.loc[index].og_index)
        if local not in exclude_points:
            point_medians.append(local)
            local_r = range(local - range_ex, local + range_ex + 1, 1)
            exclude_points.extend(local_r)
            i+=1
        index+=1
    time_stamps = []
    if 0 in point_medians:
        time_stamps.append({'start' : 0, 'end' : 10000})
        point_medians.remove(0)
    for i in point_medians:
        start = mark_dur * i - 10000
        end = mark_dur * i + 10000
        time_stamps.append({'start' : start, 'end' : end})
    return(time_stamps)
        

#when programming keep everything at proper thing


#From most viewed points, extract the transcript

#...