var app = angular.module('myApp');
app.controller("jobListCtrl", function($http, $scope, inputFactory) {
   $scope.searchObject = inputFactory.returnObject();
   console.log($scope.searchObject);
   $http({
       method: 'GET',
       url: 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?city=48207&direct=1&state=MI'
   }).then(function successCallback(response) {
           $scope.items = response.data.resultItemList;
       },
       function errorCallback(response) {
           console.log(response);
       });
   $scope.globalMap;

   function initMap(){
   $scope.globalMap = new google.maps.Map(document.getElementById('job-map'), {
       center: {
           lat: 42.2814,
           lng: -83.7483
       },
       scrollwheel: true,
       zoom: 10
       });
   }
   initMap();
   setTimeout(function () {
   // google.maps.event.trigger($scope.model.globalMap, 'resize');
   // $scope.model.globalMap.setCenter({
   //         lat: 42.2814,
   //         lng: -83.7483
   //     });
   initMap();
}, 100);

});

// app.controller('searchOutputCtrl', function($scope, inputFactory) {

// });