var app = angular.module('myApp');
//this controller will be requesting data from the API
app.controller("searchCtrl", function($http, $scope) {
    $scope.search = function() {

      var zipcode = {'city': "" + $scope.zipcode};
      console.log(zipcode);
      // var string = "" + zipcode;
      $http.post('/api/jobs', zipcode)
      // ({
      //     method: 'POST',
      //     url: 'http://localhost:8080/api/jobs',
      //     data: {'zipcode': string}
      // })
      .then(function successCallback(response) {
              $scope.items = response.data
              // $scope.job = response.data.#;
              console.log($scope.items);
          },
          function errorCallback(response) {
              console.log(response);
          });
    }
});
