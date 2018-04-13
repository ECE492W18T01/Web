'''

Creation date: March 1, 2018

Created by Steven Lagrange


code to start the sever, creation of the status component variable to be sent online
'''
from flask import Flask, render_template, jsonify, Response, make_response, request
from modules.camera import Camera
import json

app = Flask(__name__)
app_port = 3000

'''
Holds the initial status of the crawler.
This dictionary is updated with the latest crawler information as it is passed to the API.
'''
status = {
    'crawler' : {
        'connected' : 1,
        'message' : "Crawler not connected.",
        'brake' : 0,
        'distance' : 0,
        'last_updated': "",
        'motors' : {
            'fl' : 0,
            'fr' : 0,
            'rl' : 0,
            'rr' : 0,
            'steering' : 0
        },
        'sensors' : {
            'fl' : 0,
            'fr' : 0,
            'rl' : 0,
            'rr' : 0
        },
        'fuzzy' : {
            'enabled': 0,
            'fl' : 0,
            'fr' : 0,
            'rl' : 0,
            'rr' : 0,
            'steering' : 0
        }
    }
}

@app.route('/')
def index():
    ''' Renders the home page of the site. '''
    return render_template('index.html')

@app.route('/api/')
def api_home():
    ''' Loads the API description page. '''
    return render_template('api.html')

@app.route('/api/status/', methods=['GET'])
def api_status():
    ''' Returns the latest crawler status object. '''
    response = make_response(jsonify(status))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'application/json'
    print(response)
    return response

@app.route('/api/update/', methods=['POST'])
def api_update():
    ''' Checks if a POST method is recieved and then decodes the recieved JSON data. '''
    if request.method == 'POST':
        data = request.data.decode()
        data_dict = json.loads(data)
        status['crawler'] = data_dict['crawler']
    return make_response(data)


def gen(camera):
    ''' Returns the latest frame from the camera as part of a multipart response. '''
    while True:
        frame = camera.get_frame()
        if frame is not None:
            yield(b'--frame\r\n' + b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/stream/')
def stream():
    ''' Sets the stream response headers and calls the frame generator function. ''' 
    stream_mime = 'multipart/x-mixed-replace; boundary=frame'
    camera = Camera()
    camera.start()
    return Response(gen(camera), mimetype=stream_mime)



if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=app_port, threaded=True)
