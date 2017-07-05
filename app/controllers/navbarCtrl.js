"use strict";

app.controller("navBarCtrl", function($location, $scope, authFactory){
$scope.thisUser = authFactory.getUserName();
console.log("navbar User", $scope.thisUser);
	$scope.logout = () => {
    console.log("logout clicked");
    $location.path("/sdfg");
    authFactory.logoutUser()
      .then(function (data) {

      });
  };

});