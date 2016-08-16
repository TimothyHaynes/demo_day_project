var app = angular.module('myApp');

app.controller("searchOutputCtrl", function($scope, inputFactory) {
    $scope.searchOutput = inputFactory.returnObject().toJson;
    console.log($scope.searchOutput);

});

//*****for use with express query
app.controller("searchCtrl", function($http, $scope, inputFactory, $location) {

  	$scope.search = function(searchInput) {
      inputFactory.saveObject(searchInput);
      var options = inputFactory.returnObject();
      console.log(options);
      // $location.path('/jobList');
  }
});
