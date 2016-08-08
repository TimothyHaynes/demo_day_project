var app = angular.module('myApp', []);

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

app.controller("myCtrl1", function($http, $scope) {
    $http({
        method: 'GET',
        url: 'https://www.reddit.com/r/learnprogramming/.json'
    }).then(function successCallback(response) {
            $scope.items = response.data.data.children;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});

app.controller("myCtrl2", function($http, $scope) {
    $http({

        method: 'GET',
        url: 'https://www.udacity.com/public-api/v0/courses'
    }).then(function successCallback(response) {
            $scope.items = response.data.courses;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});

app.controller("myCtrl3", function($http, $scope) {
    $http({
        method: 'GET',
        url: 'https://medium.com/free-stuff/?format=json'
    }).then(function successCallback(response) {
            $scope.items = response.data;
            console.log($scope.items);
        },
        function errorCallback(response) {
            console.log(response);
        });
});
