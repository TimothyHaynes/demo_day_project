var app = angular.module('myApp');
//this controller will be requesting data from the API
app.controller("searchCtrl", function($http, $scope) {
    // $http({
    //     method: 'GET',
    //     url: ''
    // }).then(function successCallback(response) {
    //         $scope.job = response.data.#;
    //         console.log($scope.items);
    //     },
    //     function errorCallback(response) {
    //         console.log(response);
    //     });
});

//does this actually need to do anything? Maybe send info to the factory?
