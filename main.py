from functions import *
def get_timestamps(url):
    id1 = get_video_id(url)
    transcript = get_transcript(id1)
    min_list = find_minute_markers(transcript)
    listy = viewedPoints(id1)
    return(mostViewedPoints(listy))
    