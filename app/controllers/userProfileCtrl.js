"use strict";

app.controller("userProfileCtrl", function($scope, DataFactory, ChoreFactory, authFactory, $location, $routeParams){
	console.log("sdkfjg;lskfjg Task Ctrl");

	let updatingUser = authFactory.getUser();


	authFactory.getUserObj($routeParams.thisUser)
	.then((user) => {
		console.log("chore", user);
		let Nasty = user.data[updatingUser];
		console.log("$scope.user", Nasty);
		$scope.currentUser = Nasty;
		console.log("$scope.currentUser", $scope.currentUser);
	});

	$scope.updateUser = (newUser) => {
		console.log("newUser", newUser);
		authFactory.patchUser(newUser, updatingUser)
		.then((X) => {
			$location.path("#!/householdOverview");
		});
	};


});