var app = angular.module('myApp');
app.controller("jobListCtrl", function($http, $scope) {
    $http({
        method: 'GET',
        url: 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?city=48207&direct=1&state=MI'
    }).then(function successCallback(response) {
            $scope.items = response.data.resultItemList;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});

// app.controller('searchOutputCtrl', function($scope, inputFactory) {
//
// });
