angular.module('sample.services.products', [])
.service('ProductsService', function($http) {
  var url = '/products?keywords=';

  this.getProducts = function(keywords) {
    return $http.get(url + keywords);
  };
});