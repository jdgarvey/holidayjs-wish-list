angular.module( 'sample.home', [
'auth0',
'sample.services.products'
])
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store, ProductsService ) {
  var ref = new Firebase("https://torid-torch-3093.firebaseio.com");
  $scope.auth = auth;

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://localhost:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }

  $scope.getProducts = function(keywords) {
    ProductsService.getProducts(keywords)
      .then(function(response) {
          var item = response.data[0];
          ref.push(item);

          $scope.currentItem = item;
      }, function(error) {
        console.log(error);
      });
  };

});
