var app = angular.module('myApp');
//this controller will be requesting data from the API

app.controller("searchCtrl", function($scope, inputFactory) {
    $scope.submitFunc = function(searchInput) {
        inputFactory.saveObject(searchInput);
        console.log(searchInput);
    };

});

//does this actually need to do anything? Maybe send info to the factory?
