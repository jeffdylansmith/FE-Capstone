"use strict";

app.controller("navBarCtrl", function($location, $scope, authFactory){


	$scope.logout = () => {
    console.log("logout clicked");
    $location.path("/sdfg");
    authFactory.logoutUser()
      .then(function (data) {

      });
  };

});