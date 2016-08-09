var app = angular.module('projectApp');
app.controller("defaultMapCtrl", function($http, $scope) {
    $http({
        method: 'GET',
        url: ''
    }).then(function successCallback(response) {
            $scope.map = response.data.#;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});
