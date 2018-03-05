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

//Homepage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

//Update crawler information
app.post('/api/update', function(req, res) {
  crawler = req.body.crawler;
  res.send('Success');
})

app.listen(PORT, () => console.log('Example app listening on port: ', PORT));
