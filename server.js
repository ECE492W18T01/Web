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
  "connected": 0,
  "commands": "a to this to the box",
  "servo": -1,
  "break": 0,
  "battery" : 70,
  "sonar": 8 ,
  "wheels": {
    "fl": 1,
    "fr": 1,
    "rl": 1,
    "rr": 1 
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
