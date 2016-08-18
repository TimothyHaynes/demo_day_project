var app = angular.module('myApp');

app.controller("jobListCtrl", function($http, $scope, $interval, inputFactory, diceFactory) {
    $scope.$watch(function() {return inputFactory.returnObject()}, function(value) {
   $scope.searchObject = inputFactory.returnObject();

   diceFactory.post($scope.searchObject, function(response) {
    $scope.items = response.data;
    $scope.searchObject = response.body;
    doTheMap();
  });

   function initMap(){
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

    $scope.searchCenter = chooseCenterParam();
    $scope.detailedMapsInfo = [];

    function chooseCenterParam(){
        //only uses the street address as the center if it was provided
        if ($scope.searchObject.street_address !== undefined){
            return $scope.searchObject.street_address + " " + $scope.searchObject.city;
        }
        return $scope.searchObject.city;
    }

    function getCenter() {
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
            if (status == 'OK') {
                $scope.globalMap.setCenter(results[0].geometry.location);
                $scope.locationsRequest.location = results[0].geometry.location;
                $scope.locationsRequest.x = (Math.cos((Math.PI/180) * $scope.locationsRequest.location.lat())*69.172);
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
      //this function not active in current build
      var rad = 1;
      var iLat = place.geometry.location.lat();
      var iLon = place.geometry.location.lng();
      var centerLat = $scope.locationsRequest.location.lat();
      var centerLon = $scope.locationsRequest.location.lng();
      var x = $scope.locationsRequest.x;
      var rad = $scope.searchObject.rad;

      if (iLat <= centerLat + (69.172 / rad) && iLat >= centerLat - (69.172 / rad) && iLon <= centerLon + (1 / (x / rad)) && iLon > centerLon - (1 / (x / rad))) {
        return true;
      } else {
        return false;
      }
    }

    $scope.changeCenter = function(newPlace){
      $scope.globalMap.panTo(newPlace);
      $scope.globalMap.setZoom(15);
    }

    $scope.foundListings = [];
    $scope.totalResults = 0;

    function addMarker(place, loc){
        if (checkRad(place, loc)) {
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
            $scope.$apply(function() {
              $scope.modalInfo = loc.jobTitle + " " + loc.company + " " + loc.location;
              $scope.modalLink = loc.detailUrl;
              $scope.modalJob = loc.jobTitle;
              $scope.modalCompany = loc.company;
              $scope.modalLocation = loc.location;
            });
            $scope.$apply(function() {});
            //save job title, company name, and link.
          });
          google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open($scope.globalMap, this);

          });

          $scope.foundListings.push({
            link: loc.detailUrl,
            job: loc.jobTitle,
            company: loc.company,
            location: loc.location,
            latlng: place.geometry.location
          })
        }
    }//end add marker

    $scope.locationsRequest = {
        query: location.company,
        location: $scope.latlng,
        radius: 40000,
    }; //passes information generated by the APIs from user's search parameters to getLocations function

    function getLocations(){
      $scope.service = new google.maps.places.PlacesService($scope.globalMap);
      (function(){
        var counter = 0;
        $interval(function(){
          if (counter >= $scope.items.length){
            return;
          }
          doTheThing($scope.items[counter]);

          counter++;
        },415, $scope.items.length);
          $interval.cancel();
      })();
    }//end GetLocations

    function doTheThing(loc){
      $scope.service.nearbySearch({
          key: 'AIzaSyCj2K40lPL72J1ageAAVTTMH2w4N78Df74',
          location: $scope.locationsRequest.location,
          radius: $scope.searchObject.rad * 1600,
          name: loc.company + " " + loc.location
        }, function(results, status){
          if(status == "OK") {
            var place = results[0];
            addMarker(place, loc);
          }
        });
      }//end doTheThing

    function doTheMap(){
      initMap();
      getCenter();
    }
}, true);

});