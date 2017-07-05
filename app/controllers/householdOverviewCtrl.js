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
			console.log("This is what you're looking for...", answer.data);
			let houseMembers = answer.data;
			$scope.members = [];
			for(let X in houseMembers){
				let prizesCat = [];
				if (houseMembers[X].trophies){
					console.log("houseMembers[X].trophies", houseMembers[X].trophies);
					for(let Y in houseMembers[X].trophies){
					console.log("trophies", houseMembers[X].trophies[Y]);
					prizesCat.push(houseMembers[X].trophies[Y]);
					}
				}
				console.log("prize", prizesCat);
				houseMembers[X].prizes = prizesCat;
				$scope.members.push(houseMembers[X]);
				console.log("$scope.membert", $scope.members);
			}

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
  	  let month = $moment().format('MMMYYYY');
  	  console.log(month);
  	  DataFactory.getMonthDate()
		.then((date) => {
			console.log("?????", date, month);
			if (date === month) {
				console.log("date is up to date");
			} else {
				console.log("we need award a trophy", $scope.currentHouse);
				DataFactory.awardTrophy($scope.currentHouse, date)
					.then((done) => {
						DataFactory.postMonthDate(month)
						.then((X) => {
							getHouseholdOverviewInfo();
						});
					});

			}
		});
	};


checkDay();
getHouseholdOverviewInfo();
});


