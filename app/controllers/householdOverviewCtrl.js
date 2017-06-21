"use strict";

app.controller("householdOverviewCtrl", function($scope, authFactory, $http, FBcreds, DataFactory, $moment, ChoreFactory){
	console.log("householdOverviewCtrl");
	$scope.houseObj = {};
	$scope.currentHouse = "";


	let getHouseholdOverviewInfo = () => {
		let thecurrentUser = authFactory.getUser();
		console.log("this is my house!!!", thecurrentUser);
		authFactory.getUserHousehold(thecurrentUser)
		.then((householdId) => {
			console.log("householdId", householdId);
			$scope.currentHouse = householdId;
			DataFactory.getHouse(householdId)
			.then((house) => {
			$scope.houseObj = house;
			console.log("we did it - householdId", house);
			});
		});
	};


	let checkDay = () => {
		let now = $moment().format('dddd');
		console.log("now", now);
		DataFactory.getDay()
		.then((day) => {
			if (day === now) {
				console.log("day is up to date");
			} else {
				console.log("yo, we need to update our day here...");
				DataFactory.postDay(now)
					.then((answer) => {
						let today = answer.data;
						console.log("answer" ,answer.data);
						ChoreFactory.getDayChores(today, $scope.currentHouse)
						.then((dailychores) => {
							ChoreFactory.assignDailyChores(dailychores, $scope.currentHouse)
							.then((answer) => {
								console.log("daily chores", answer);
								// ChoreFactory.postTodayChores(answer);
							});
						});
					});
			}
		});
	};

checkDay();
getHouseholdOverviewInfo();
});


