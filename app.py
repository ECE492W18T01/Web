from flask import Flask, render_template, jsonify

app = Flask(__name__)
app_port = 3000

status = {
    "crawler": {
        "connected": 0,
        "message": "Crawler not connected.",
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

@app.route('/stream/')
def stream():
    return render_template('test.html')

@app.route('/api/')
def api_home():
    return render_template('api.html')

@app.route('/api/status/')
def api_status():
    return jsonify(status)

@app.route('/api/update/')
def api_update():
    return 200


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=app_port)
