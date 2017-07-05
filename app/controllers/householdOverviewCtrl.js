"use strict";

app.controller("householdOverviewCtrl", function($scope, authFactory, $http, FBcreds, DataFactory, $moment, ChoreFactory, $location){
	console.log("householdOverviewCtrl");
	$scope.houseObj = {};
	$scope.currentHouse = "";
	$scope.thisUser = authFactory.getUser();
	$scope.thisUserName = authFactory.getUserName();

	let getHouseholdOverviewInfo = () => {
		let thecurrentUser = authFactory.getUser();
		console.log("this is my house!!!", thecurrentUser);
		authFactory.getUserHousehold(thecurrentUser)
		.then((householdId) => {
			checkMonth();
			console.log("householdId", householdId);
			$scope.currentHouse = householdId;
			getMembers($scope.currentHouse);
			DataFactory.getHouse(householdId)
			.then((house) => {
				$scope.houseObj = house;
				console.log("we did it - householdId", house);
			});
		});
	};

	let getMembers = (X) => {
		console.log("getMembersXXX", X);
		authFactory.getHouseholdMembersProfiles(X)
		.then((answer) => {
			console.log(answer.data);
			$scope.members = answer.data;
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
							});
						});
					});
			}
		});
	};

    $scope.logout = () => {
    console.log("logout clicked");
    $location.path("/sdfg");
    authFactory.logoutUser()
      .then(function (data) {

      });
    };

    let checkMonth = () => {
  	  let monthDate = $moment().format('MMM YYYY');
  	  console.log(monthDate);
  	  DataFactory.getMonthDate()
		.then((date) => {
			if (date === monthDate) {
				console.log("date is up to date");
			} else {
				console.log("we need award a trophy", $scope.currentHouse);
				DataFactory.awardTrophy($scope.currentHouse, date)
					.then((done) => {
						DataFactory.postMonthDate(monthDate);
					});
			}
		});
	};


checkDay();
getHouseholdOverviewInfo();
});


