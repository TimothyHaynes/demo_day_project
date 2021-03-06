'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var r = require('./request');
var http = require('http');
var diceCreate = require('./diceCreate');
var IterateOver = require('./recurse');
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
    console.log(req.body);
    var body = req.body;
    if(Object.keys(body).length === 0) {

      if (resp) {
        res.json(resp);
      }

    } else {
      var dice = diceCreate(req.body);
      IterateOver(dice, r,
       function(data) {
        res.json({data: data, body});
      });

  };
  });
}
//REGISTER OUR ROUTES
//all of our routes will be prefixed with /API
app.use('/api', router);


//START THE server
//==============
app.listen(port);
console.log('Magic happens on port ' + port);
