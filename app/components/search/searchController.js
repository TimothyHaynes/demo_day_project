var app = angular.module('myApp');
//this controller will be requesting data from the API

app.controller("searchCtrl", function($scope, inputFactory, $location) {
    $scope.submitFunc = function(searchInput) {
        inputFactory.saveObject(searchInput);
        console.log(searchInput);
        $location.path('/jobList');
    };

});

app.controller("searchOutputCtrl", function($scope, inputFactory) {
    $scope.searchOutput = inputFactory.returnObject();
    console.log($scope.searchOutput);
});

//does this actually need to do anything? Maybe send info to the factory?
