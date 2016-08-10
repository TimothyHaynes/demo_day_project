var app = angular.module('myApp');
app.controller("ajaxApp", ["$scope", "$http", function($scope, $http) {
  $http({
    method: "GET",
    url: "http://localhost:8080/api/reddit"
  })
  .then(function successCallback(response) {
    var articles = (response.data);
    var title = articles.data.children[0].data.title;
    $scope.title = "Angular: " + title;
  }, function errorCallback(response) {
    if(response.error) return console.error(response.error);
  });
}])
