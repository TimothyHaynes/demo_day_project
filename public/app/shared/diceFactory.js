var app = angular.module('myApp');

app.factory('diceFactory', function($http) {
    var diceResponse = 0;

  return {
    post: function(options, callback) {
      console.log('posting');
      $http.post('/api/jobs', options)
      .then(function successCallback(response) {
          console.log('response: ' + response.data);
            diceResponse = response.data;
            console.log('diceResponse: ' + diceResponse);
            callback(diceResponse);
        },
        function errorCallback(response) {
            console.log(response);
        });
      },
    data: function() {
      return diceResponse;
    }
  }
})
