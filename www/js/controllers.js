angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('RestaurantsCtrl', function($scope, Restaurants) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Restaurants.all().success(function (result) {
      $scope.restaurants = result.restaurants;
  });
  

})

.controller('RestaurantDetailCtrl', function($scope, $stateParams, $cordovaGeolocation, Restaurants) {
  $scope.restaurant = Restaurants.get($stateParams.restaurantId);
    console.log('lookup',$stateParams.restaurantId,$scope.restaurant );
    
  var RestaurantLatLng = new google.maps.LatLng($scope.restaurant.location.latitude, $scope.restaurant.location.longitude);
    
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var MylatLng = new google.maps.LatLng(position.coords.latitude,                     position.coords.longitude);
 
    var mapOptions = {
      center: RestaurantLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var Mymarker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: MylatLng
      });     
      var Restaurantmarker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: RestaurantLatLng
      }); 
      var MyinfoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });
      var RestaurantinfoWindow = new google.maps.InfoWindow({
          content: $scope.restaurant.name
      });

      google.maps.event.addListener(Mymarker, 'click', function () {
          MyinfoWindow.open($scope.map, Mymarker);
      });
        
      google.maps.event.addListener(Restaurantmarker, 'click', function () {
          RestaurantinfoWindow.open($scope.map, Restaurantmarker);
      });

    });
 
  }, function(error){
    console.log("Could not get location");
  });
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });     
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    });
 
  }, function(error){
    console.log("Could not get location");
  });
});
