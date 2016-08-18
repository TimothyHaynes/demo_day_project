var app = angular.module('myApp');

app.controller("searchOutputCtrl", function($scope, inputFactory) {
    $scope.searchOutput = inputFactory.returnObject().toJson;
    console.log($scope.searchOutput);

});

//*****for use with express query
app.controller("searchCtrl", function($http, $scope, inputFactory, $location) {

  	$scope.search = function(searchInput) {
      var object = {};
      object.city = searchInput.city;
      object.rad = searchInput.rad;
      object.skill = searchInput.skill;
      object.street_address = searchInput.street_address;
      inputFactory.saveObject(object);
      var options = inputFactory.returnObject();
      console.log(options);
      // $location.path('/jobList');
  };
});
