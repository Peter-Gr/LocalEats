angular.module('starter.services', [])

.factory('Restaurants', function($http) {
  // Might use a resource here that returns a JSON array

    var Restaurants = {'restaurants' : []};

  return {
    all : function () {
         return $http({
            method: 'GET',
            url: 'https://developers.zomato.com/api/v2.1/search',
            headers: {'user_key' : '3d4e7b71dc47706408c4032e2b421570'},
            params: {
                entity_id: '90',
                entity_type : 'city'
            }
        }).success(function (data) {
            Restaurants = data;
        });
    },
    get: function(restaurantId) {
        console.log("get", Restaurants,Restaurants.restaurants.length);
      for (var i = 0; i < Restaurants.restaurants.length; i++) {
         if (Restaurants.restaurants[i].restaurant.id === restaurantId) {
          return Restaurants.restaurants[i].restaurant;
        }
      }
      return null;
    }
  };
});
