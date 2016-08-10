var app = angular.module('myApp');
//this controller will be requesting data from the API
app.controller("searchCtrl", function($http, $scope) {
    $scope.search = function() {

      var zipcode = $scope.zipcode;
      console.log(zipcode);
      $http({
          method: 'POST',
          url: 'http://localhost:8080/api/jobs',
          data: {'zipcode': zipcode}
      }).then(function successCallback(response) {
              $scope.items = response.data.resultItemList
              // $scope.job = response.data.#;
              console.log($scope.items);
          },
          function errorCallback(response) {
              console.log(response);
          });
    }
});
