"use strict";

app.controller("AuthPageCtrl", function($scope, authFactory, $window, $location, $http, FBcreds, $q, DataFactory){
	console.log("Houston, we have landing page controller...");
	let userObj = {
		name: "",
		//uid: "",
	};

	$scope.isLoggedIn = false;

	$scope.logInGoogle = () => {
		console.log("now logging in...");
		let provider = new firebase.auth.GoogleAuthProvider();
    		authFactory.authWithProvider(provider)
     	    .then(function (result) {
				var user = result.user.uid;
				console.log("user", user, "result", result);
				DataFactory.checkHousehold(user)
				.then((X) => {
					console.log(X);
				});
        	});
    };

    firebase.auth().onAuthStateChanged(function (user) {
	    if (user) {
		      $scope.isLoggedIn = true;
		      console.log("currentUser logged in", $scope.isLoggedIn);

		      userObj.name = user.displayName;
		      //userObj.uid = user.uid;

		      authFactory.addUser(user.uid, userObj);
		      $scope.$apply();
	    } else {
		      $scope.isLoggedIn = false;
		      console.log("currentUser logged in", $scope.isLoggedIn);
		      $location.path("/");
		      $scope.$apply();
	    }
	});

    $scope.logout = () => {
    console.log("logout clicked");
    authFactory.logoutUser()
      .then(function (data) {
        console.log("logged out?", data);
        $location.path("/"); //instead of '$location.path' that used to be here
      }, function (error) {
        console.log("error occured on logout");
      });
  };
});
