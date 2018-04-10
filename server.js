/** API
 *
 * Smart Tank Application Interface.
 *
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var status = {
  "crawler": {
    "connected": 0,
    "message": "Crawler not connected.",
    "servo": 0,
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


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('static'));

app.get('/', function(req, res) {
  /** Homepage */
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/', function(req, res) {
  /** Homepage */
  res.sendFile(path.join(__dirname + '/public/api.html'));
});

app.post('/api/update/', function(req, res) {
  /** Update latest crawler data */
  status.crawler = req.body.crawler;
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.sendStatus(200);
});

app.get('/api/status/', function(req, res) {
  /** Return crawler information */
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  data = JSON.stringify(status)
  res.send(data);
});


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
