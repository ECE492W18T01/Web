from flask import Flask, render_template, jsonify, Response, make_response
from modules.camera import Camera

app = Flask(__name__)
app_port = 3000

status = {
    "crawler": {
        "connected": 0,
        "message": "Crawler not connected..",
        "steering": 0,
        "brake": 0,
        "sonar": 0,
        "wheels": {
          "fl": 0,
          "fr": 0,
          "rl": 0,
          "rr": 0
        }
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stream/v1')
def stream_v1():
    return render_template('stream.html')

@app.route('/api/')
def api_home():
    return render_template('api.html')

@app.route('/api/status/')
def api_status():
    response = make_response(jsonify(status))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'application/json'
    print(response)
    return response

@app.route('/api/update/')
def api_update():
    return 200

@app.route('/stream/')
def stream_index():
    return render_template('stream2.html')


def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame is not None:
            yield(b'--frame\r\n' + b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/stream/v2')
def stream_v2():
    stream_mime = 'multipart/x-mixed-replace; boundary=frame'
    camera = Camera()
    camera.start()
    return Response(gen(camera), mimetype=stream_mime)



if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=app_port, threaded=True)
