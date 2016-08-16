'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var r = require('./request');
var http = require('http');
var diceCreate = require('./diceCreate');
var moreResults = require('./moreResults');

//configure app to use bodyParser()
//this will let us get data from POST
//parses urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
//parses json
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var port = process.env.PORT || 8080; //set our PORT

//Routes for API
//==============

var router = express.Router();

{ let resp;
  router.post('/jobs', function(req, res) {
    var body = req.body;
    console.log("req.body:" + req.body);
    if(Object.keys(body).length === 0) {
      console.log("default response");
      console.log(resp);
      res.json(resp);
    } else {
      moreResults(req, res);
      // console.log("object is not empty");
      // var dice = diceCreate(req.body);
      // console.log(dice);
      // r(dice, function(result) {
      //   resp = {result, body};
      //   res.json({result, body});
      // });
  };
    // if (body.keys(obj) !== 0) {}

  });
}

router.get('/reddit', function(req, res) {
    r(reddit, function(result) {
        // var jsonified = JSON.parse(result);
        // console.log("Resulting: " + result);
        res.json(result);

    });
});
//we will add more API routes here

//REGISTER OUR ROUTES
//all of our routes will be prefixed with /API
app.use('/api', router);


//START THE server
//==============
app.listen(port);
console.log('Magic happens on port ' + port);
