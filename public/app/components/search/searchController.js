var app = angular.module('myApp');
//this controller will be requesting data from the API

<<<<<<< HEAD
// app.controller("searchCtrl", function($scope, inputFactory, $location) {
//     $scope.submitFunc = function(searchInput) {
//         inputFactory.saveObject(searchInput);
//         console.log(searchInput);
//         $location.path('/jobList');
//     };
//
// });

app.controller("searchOutputCtrl", function($scope, inputFactory) {
    $scope.searchOutput = inputFactory.returnObject().toJson;
    console.log($scope.searchOutput);
=======
app.controller("searchCtrl", function($scope, inputFactory, $location) {
    $scope.submitFunc = function(searchInput) {
        inputFactory.saveObject(searchInput);
        //console.log(searchInput);
        $location.path('/jobList');
    };

});

app.controller("searchOutputCtrl", function($scope, inputFactory) {
    $scope.searchOutput = inputFactory.returnObject();
    //console.log($scope.searchOutput);
>>>>>>> 4c63ae10fa109039a976b9169de126cb6ea6b272
});

//does this actually need to do anything? Maybe send info to the factory?

//*****for use with express query
app.controller("searchCtrl", function($http, $scope, inputFactory, $location) {

  $scope.search = function(searchInput) {
    // console.log($scope.searchInput);
      inputFactory.saveObject(searchInput);
      var options = inputFactory.returnObject();
      console.log(options);
      $location.path('/jobList');
      // var string = "" + zipcode;
      // $http.post('/api/jobs', options)
      // // ({
      // //     method: 'POST',
      // //     url: 'http://localhost:8080/api/jobs',
      // //     data: {'zipcode': string}
      // // })
      // .then(function successCallback(response) {
      //         $scope.items = response.data
      //         // $scope.job = response.data.#;
      //         console.log($scope.items);
      //     },
      //     function errorCallback(response) {
      //         console.log(response);
      //     });


    }
});
