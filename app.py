from flask import Flask, request
import json
from main import *

app = Flask(__name__)
import logging

print("hello")

@app.route('/process_url', methods=['POST'])
def process_url():
    # Get the YouTube URL from the request body
    url = request.json['url']
    
    # Do something with the URL here
    print(url)
    result = json.loads(url)
    time_stamps = get_timestamps(result)
    print(time_stamps)
    logging.warning(url)
    return 'Success'

if __name__ == '__main__':
    app.run(debug=True)