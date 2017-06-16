"use strict";

app.controller("joinorCreateNewCtrl", function($scope, authFactory, DataFactory, $location){
	console.log("hey you got join or create control");




	$scope.createNewHouse = (text) => {
		let newHousehold = {
			name: text
		};
		console.log("create new house", newHousehold);
		DataFactory.createHousehold(newHousehold)
		.then((newHouseId) => {
			console.log("newHouseId", newHouseId);
			$scope.joinExistingHouse(newHouseId);
		});
	};

	$scope.joinExistingHouse = (houseId) => {
		let user = authFactory.getUser();
		let addingMember = {
			householdId: houseId
		};
		console.log("existing house function", houseId);
		console.log("user", user);
		DataFactory.addUserToHouse(addingMember, user)
		.then((X) => {
			console.log("Your new house code is:", houseId);
			$location.path("/householdOverview");
		});
	};

});