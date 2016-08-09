var app = angular.module('projectApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/view1', {
            controller: "searchCtrl",
            templateUrl: "partials/view1.html"
        })
        .when('/view2', {
            controller: "defaultMapCtrl",
            templateUrl: "partials/view2.html"
        })
        .when('/view3', {
            controller: "jobsCtrl",
            templateUrl: "partials/view3.html"
        });
});


// app.controller("addressCtrl", function($http, $scope) {
//     $http({
//         method: 'GET',
//         url: ''
//     }).then(function successCallback(response) {
//             $scope.map = response.data.#;
//             console.log($scope.items);
//         },
//         function errorCallback(response) {
//             console.log(response);
//         });
// });
