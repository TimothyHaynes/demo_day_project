var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/view1', {
            controller: "searchCtrl",
            templateUrl: "partials/view1.html"
        })
        .when('/view2', {
            controller: "jobListCtrl",
            templateUrl: "partials/view2.html"
        })
        .when('/view3', {
            controller: "jobsCtrl",
            templateUrl: "partials/view3.html"
        });
});
