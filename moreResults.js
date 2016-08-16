var diceCreate = require('./diceCreate');
var r = require('./request');

module.exports = function moreResults(req, res){	
	console.log("object is not empty");
	var pageCounter = 1;
	do {
		req.body.page = pageCounter;
		var dice = diceCreate(req.body);
		console.log(dice);
		r(dice, function(result) {
			resp = {result, body};
			res.json({result, body});
		});
	} while(result.resultItemList.length > 0);
}