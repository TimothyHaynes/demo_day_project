{let superArray= [];
  function IterateOver(dice, iterator, callback){
    var doneCount = 0;
    var options = dice;

    function report(data) {
      superArray.concat(data.resultItemList);
      options.path = data.nextUrl;
      doneCount++;

      if (doneCount === numRequests) {
        callback(superArray);
      }
    }

    for (var i = 1; i < 10; i++) {

      iterator(options, report);
    }
  }
}


//r takes options and a callback
  //the callback gets passed the object response from DICE.
  var dice = diceCreate(body);
  IterateOver(dice, r(options, report(data)),
   function(data) {
    res.json({data, body});
  });

//call IterateOver
//set dice to options var
// call iterator/r passing it options and a callback, report.
//request searches with the options
//iterator/r calls callback/report with Dice data
//report concats DICEdata onto superArray
//report increments doneCount by 1
//report checks if loop var = doneCount
//does not, so loops again.
//if loop var === doneCount
  //call callback/function(data) { res.json({data, body})}
  //callback gets called, exporting finished superArray
