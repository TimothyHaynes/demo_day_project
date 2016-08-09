var app = angular.module('projectApp');
//this controller will be requesting data from the API
app.controller("jobsCtrl", function($http, $scope) {
    $http({
        method: 'GET',
        url: ''
    }).then(function successCallback(response) {
            $scope.job = response.data.#;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});
