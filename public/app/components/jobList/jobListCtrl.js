var app = angular.module('myApp');

app.controller("jobListCtrl", function($http, $scope, $interval, inputFactory, diceFactory) {
    $scope.$watch(function() {return inputFactory.returnObject()}, function(value) {
      // if(Object.keys(value).length > 0) {
   $scope.searchObject = inputFactory.returnObject();
   console.log($scope.searchObject);

   diceFactory.post($scope.searchObject, function(response) {
    console.log(response);
    $scope.items = response.result.resultItemList;
    $scope.searchObject = response.body;
    doTheMap();
  });

   function initMap(){
    console.log("init Map starts");
    angular.element(document).ready(function(){
      $scope.globalMap = new google.maps.Map(document.getElementById('job-map'), {
          center: {
              lat: 42.2814,
              lng: -83.7483
          },
          scrollwheel: false,
          zoom: 13
          });
    });

    }

    //The Dice API returns an array (currently)called $scope.items
    //First, I need to find the address and use it for the center
    //Also use the address for the center of the PlacesServices if provided
    //otherwise, use the zipcode for the center of PS
    //


    $scope.searchCenter = chooseCenterParam();
    $scope.detailedMapsInfo = [];



    function chooseCenterParam(){
        //only uses the street address as the center if it was provided
        console.log("chooseCenterParam starts");
        if ($scope.searchObject.street_address !== undefined){
            return $scope.searchObject.street_address + " " + $scope.searchObject.city;
        }
        return $scope.searchObject.city;
    }


    function getCenter() {
        console.log("get center starts");
        //takes user input and centers the map on the selected location
        chooseCenterParam();
        $scope.geocoder = new google.maps.Geocoder();
        $scope.geocoder.geocode({
            address: $scope.searchCenter,
            componentRestrictions: {
                country: 'US',
                postalCode: $scope.searchObject.city
            }
        }, function(results, status) {
          console.log("get center callback starts");
            if (status == 'OK') {
                $scope.globalMap.setCenter(results[0].geometry.location);
                $scope.locationsRequest.location = results[0].geometry.location;
                $scope.locationsRequest.x = (Math.cos((Math.PI/180) * $scope.locationsRequest.location.lat())*69.172);
                console.log($scope.locationsRequest.x);
                console.log("latlng literal from Get Center: "+$scope.locationsRequest.location);
                getLocations();
            }
        });
    }
    //funtion containing conditional logic comparing each result to the user input rad property if within limit add marker to page.
    //itemLat && itemLon = business result place

    //iLat && iLon = location of user input
    //if (itemLat <= centerLat + rad && iLat >= centerLat - rad && iLon <= centerLon + rad && iLon> centLon - rad) {}

    //Length of 1 degree of Longitude = cosine (latitude) * length of degree (miles) at equator

    //length of 1° of latitude = 1° * 69.172 miles = 69.172 miles

    // scope.locationsRequest.location  (this is the user input center)
    // 1st calculate the actual length of of lat long here
    // 2nd then apply that calculation to translate to a radius to conditionally check each result to the defined radius
    //then place

    function checkRad(place, loc) {
      var rad = 1;
      var iLat = place.geometry.location.lat();
      console.log(loc);
      var iLon = place.geometry.location.lng();

      var centerLat = $scope.locationsRequest.location.lat();
      var centerLon = $scope.locationsRequest.location.lng();
      var x = $scope.locationsRequest.x;
      var rad = $scope.searchObject.rad;
      console.log($scope.searchObject.rad);

      if (iLat <= centerLat + (69.172 / rad) && iLat >= centerLat - (69.172 / rad) && iLon <= centerLon + (1 / (x / rad)) && iLon > centerLon - (1 / (x / rad))) {
        return true;
      } else {
        return false;
      }
    }
    $scope.totalResults = 0;
    function addMarker(place, loc){
      console.log("addMarker starts");
      console.log(place.geometry.location.lat());
        if (checkRad(place, loc)) {
          // var contentString = "Hello";
          // var infoWindow = new google.maps.infoWindow ({
          //   content: contentString
          // });

          var linkUrl = '<a href="' + loc.detailUrl + '" target=\"_blank\">Apply Here</a>';
          var content = '<div id="iw_container">'+'<div id="iw_title">' + loc.jobTitle + '</div>' + '<div class="iw_content">' + loc.company + '<br>' + loc.location + '<br>' + linkUrl + '</div>'+'</div>';


          var myModal = new google.maps.InfoWindow({
            content: content
          });

          var marker = new google.maps.Marker({
              map: $scope.globalMap,
              position: place.geometry.location,
              icon: {
                  url: 'http://maps.gstatic.com/mapfiles/circle.png',
                  anchor: new google.maps.Point(10, 10),
                  scaledSize: new google.maps.Size(10, 17)
              },
              infowindow: myModal
          });


          $scope.totalResults++;
          marker.addListener('click', function(){
            console.log('You Clicked Me! Yay!!!!');
            console.log("location: " + loc.location);
            $scope.$apply(function() {
              $scope.modalInfo = loc.jobTitle + " " + loc.company + " " + loc.location;
              $scope.modalLink = loc.detailUrl;
              $scope.modalJob = loc.jobTitle;
              $scope.modalCompany = loc.company;
              $scope.modalLocation = loc.location;
            });
            $scope.$apply(function() {});
            // var stuffInModal = angular.element(document.querySelector('#modal'));
            // stuffInModal.append($scope.modalInfo);
            console.log($scope.modalInfo);
            //save job title, company name, and link.
            //save address
          });
          google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open($scope.globalMap, this);

          });
        }
        // var contentString = "Hello";
    }

    $scope.locationsRequest = {
        query: location.company,
        location: $scope.latlng,
        radius: 40000,
    }; //passes information generated by the APIs from user's search parameters to getLocations function

    //THIS IS THE FUNCTIONAL GETLOCATIONS FUNCTION

    function getLocations(){
      console.log("results from Dice:"); console.log($scope.items);
      $scope.service = new google.maps.places.PlacesService($scope.globalMap);
      console.log("latlng literal from getLocations: "+$scope.locationsRequest.location);

      //for(var i=0; i <= $scope.items.length; i++){
      //$scope.items.forEach(function(location){
        (function(){
          console.log("for reference, $scope.items.length = " +$scope.items.length);
          var counter = 0;
          $interval(function(){
            if (counter >= $scope.items.length){
              return;
            }
            console.log("counter: " + counter);
            console.log($scope.items[counter]);
            doTheThing($scope.items[counter]);

            counter++;
          },415, $scope.items.length);
            //clearInterval(interval);
            $interval.cancel();
            // $scope.totalResults = resultCounter;
        })();
    }//end GetLocations experimental

    function doTheThing(loc){
      $scope.service.nearbySearch({
          key: 'AIzaSyCj2K40lPL72J1ageAAVTTMH2w4N78Df74',
          //keyword: location.company,
          location: $scope.locationsRequest.location,
          radius: $scope.searchObject.rad * 1600,
          name: loc.company + " " + loc.location
        }, function(results, status){
          console.log("nearbySearch results callback status for: "+loc.company+" "+ loc.location+": " + status);
          if(status == "OK") {
            console.log("results: "); console.log(results[0]);
            var place = results[0];
            addMarker(place, loc);
          }
        });
        //console.log("address search for geocoder is:" + location.company + " " + location.location);
        // $scope.geocoder.geocode({
        //   address: location.company + " " + location.location
        //   //bounds: LatLngBounds,
        // }, function(results, status){
        //   console.log("geocoder results callback status: " + status);
        //   console.log("results: "); console.log(results[0]);
        //   var place = results[0];
        //   addMarker(place);
        // });//end .geocode
      }//end doTheThing

    function doTheMap(){
      console.log("dotheMap starts");
        initMap();
        getCenter();

    }
  // }
}, true);

});


// app.controller('searchOutputCtrl', function($scope, inputFactory) {

// });
