from flask import Flask, request

app = Flask(__name__)
import logging

print("hello")

@app.route('/process_url', methods=['POST'])
def process_url():
    # Get the YouTube URL from the request body
    url = request.json['url']
    
    # Do something with the URL here
    print(url)
    logging.warning(url)
    return 'Success'

if __name__ == '__main__':
    app.run(debug=True)