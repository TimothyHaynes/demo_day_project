{
  module.exports = function IterateOver(dice, iterator, callback){
    // console.log("Iterator");
    loops = 3;
    var superArray = [];
    var doneCount = 0;
    var options = dice;

    function report(data) {
      // console.log("data");
      // console.log(data.resultItemList[0]);
      superArray = superArray.concat(data.resultItemList);
      // console.log(superArray);
      // console.log("superArray");
      // console.log(superArray);
      // options.path = data.nextUrl;
      doneCount++;

      if (doneCount === loops) {
        callback(superArray);
      }
    }

    for (var i = 1; i < loops + 1; i++) {
      // console.log(i);
      var improv = Object.assign({}, dice);
      improv.path += ('&page=' + i);
      console.log(improv);
      // console.log("improv: ");
      // console.log(improv);
      // improv.path += ('&page=' + i);
      iterator(improv, report);
      improv.path = options.path;
    }
  }
}


//r takes options and a callback
  //the callback gets passed the object response from DICE.

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
