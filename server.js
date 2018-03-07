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

var PORT = 8080;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function(req, res) {
  // Homepage
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.post('/api/update/', function(req, res) {
  //Send latest crawler information to client
  crawler = req.body.crawler;
  res.send('Success');
})

app.listen(PORT, () => console.log('Example app listening on port: ', PORT));
