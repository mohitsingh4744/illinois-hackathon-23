import urllib.parse
from youtube_transcript_api import YouTubeTranscriptApi
import json
import pandas as pd
from pandas import json_normalize
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
#currently cutting transcript at every 1 min
def cut_transcript(transcript):
    df = pd.DataFrame(transcript)
    print(df)
    

#from youtube id visit the website and extract most viewed points (convert miliseconds to timestamp? function)
#when programming keep everything at proper thing

#From most viewed points, extract the transcript

#...