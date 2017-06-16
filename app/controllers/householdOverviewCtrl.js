"use strict";

app.controller("householdOverviewCtrl", function($scope, authFactory, $http, FBcreds, DataFactory){
	console.log("householdOverviewCtrl");
	$scope.houseObj = {};



	let getHouseholdOverviewInfo = () => {
		let thecurrentUser = authFactory.getUser();
		console.log("this is my house!!!", thecurrentUser);
		authFactory.getUserHousehold(thecurrentUser)
		.then((householdId) => {
			console.log("householdId", householdId);
			DataFactory.getHouse(householdId)
			.then((house) => {
			$scope.houseObj = house;
			console.log("we did it - householdId", house);
			});
		});
	};



getHouseholdOverviewInfo();
});


