/** Server
 *
 * Smart Tank Web application.
 *
 * Future Development:
 * - Update front end with latest crawler information.
 * - Specify camera feed resolution (optional).
 * - Add user authentication (optional).
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var crawler = {
  "connected": 1,
  "servo": 1,
  "break": 0,
  "battery" : 50,
  "sonar": 12,
  "wheels": {
    "fl": 0,
    "fr": 0,
    "rl": 0,
    "rr": 0
  },
}


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('static'));

app.get('/', function(req, res) {
  /** Homepage */
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/api/update/', function(req, res) {
  /** Update latest crawler data */
  crawler = req.body.crawler;
  res.sendStatus(200);
})

app.get('/api/status/', function(req, res) {
  /** Return crawler information */
  res.send(crawler);
})


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
