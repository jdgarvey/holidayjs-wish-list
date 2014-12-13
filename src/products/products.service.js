angular.module('sample.services.products', [])
.service('ProductsService', function($http, ENDPOINT) {
  var url = ENDPOINT + '/products?keywords=';

  this.getProducts = function(keywords) {
    return $http.get(url + keywords);
  };
});