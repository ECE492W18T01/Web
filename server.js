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
  /** Send latest crawler information to client */
  crawler = req.body.crawler;
  res.send('Success');
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
