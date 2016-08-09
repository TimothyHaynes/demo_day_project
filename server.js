var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var r = require('./request');
var http = require('http');

//configure app to use bodyParser()
//this will let us get data from POST
//parses urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//parses json
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //set our PORT

//Routes for API
//==============
var reddit = {
  hostname: 'www.reddit.com',
  host: 'www.reddit.com',
  port: 80,
  path: '/.json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Length': Buffer.byteLength(getData)
  }
};
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/reddit', function(req, res) {
  r(reddit, function(result) {
    var jsonified = JSON.parse(result);
    res.json(jsonified);
  });
});
//we will add more API routes here

// console.log(request(reddit));
//REGISTER OUR ROUTES
//all of our routes will be prefixed with /API
app.use('/api', router);

//START THE server
//==============
app.listen(port);
console.log('Magic happens on port ' + port);
