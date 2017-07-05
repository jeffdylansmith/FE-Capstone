"use strict";

app.factory("DataFactory", function($q, $http, FBcreds, $location, $moment, ChoreFactory, authFactory){

	const getDay = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/day/.json`)
			.then((response) => {
				console.log("get day", response);
				resolve(response.data);
			});
		});
	};

	const postDay = (day) => {
		console.log(day);
		return $q((resolve, reject) => {
			let today = JSON.stringify(day);
			$http.put(`${FBcreds.databaseURL}/day/.json`, today)
			.then((post) => {
				console.log(" day posted", day);
				resolve(post);
			});
		});
	};

	const getMonthDate = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/monthDate/.json`)
			.then((response) => {
				console.log("get day", response);
				resolve(response.data);
			});
		});
	};

	const postMonthDate = (date) => {
		console.log(date);
		return $q((resolve, reject) => {
			let todayX = JSON.stringify(date);
			$http.put(`${FBcreds.databaseURL}/monthDate/.json`, todayX)
			.then((post) => {
				console.log(" Month posted", post);
				resolve(post);
			});
		});
	};

	const checkPulled = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/pulled/.json`)
			.then((response) => {
				let done = response.data;
				resolve(done);
			});
		});
	};

	const checkHousehold = (user) => {
		return $q((resolve, reject) => {
			console.log("data", user);
			$http.get(`${FBcreds.databaseURL}/users/${user}/.json`)
			.then((userObject) => {
				console.log("userObject", userObject.data.householdId);
				if (userObject.data.householdId === undefined) {
					console.log("you dont have a house");
					$location.path("/firstTime");
				} else {
					$location.path("/householdOverview");
				}
	     	});
		});
	};

	const getHousehold = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/users/${userId}/householdId/.json`)
			.then((household) => {
				console.log("DF household", household.data);
				resolve(household.data);
			});
		});
	};

	const returnHousehold = (userId) => {
			$http.get(`${FBcreds.databaseURL}/users/${userId}/householdId/.json`)
			.then((household) => {
				console.log("DF household", household.data);
				return household.data;
			});
	};

	const createHousehold = (newHouseObj) => {
		let newHouse = JSON.stringify(newHouseObj);
		return $q((resolve, reject) => {
		$http.post(`${FBcreds.databaseURL}/households.json`, newHouse)
		.then((houseId) => {
				console.log("houseId", houseId.data.name);
				resolve(houseId.data.name);
			})
		.catch((error) => {
				console.log("error", error);
			});
		});
	};

	const getHouse = (houseId) => {
		let houseObject = {};
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/households/${houseId}.json`)
			.then((response) => {
				houseObject = response.data;
				console.log("datafactory house response", houseObject);
				resolve(houseObject);
			});
		});
	};

	const addUserToHouse = (houseId, user) => {
		return $q((resolve, reject) => {
		console.log("addUserToHouse", houseId);
		let addMember = JSON.stringify(houseId);
		$http.patch(`${FBcreds.databaseURL}/users/${user}/.json`, addMember)
			.then((response) => {
				resolve(response);
			});
		});
	};

	const awardTrophy = (houseIdd, monthDate) => {
		console.log("houseID*(*(*(**(", houseIdd);
		var pointsArray = [];
		return $q((resolve, reject) => {
			authFactory.getHouseholdMembersProfiles(houseIdd)
			.then((contestant) => {
				console.log("Award Trophy response", contestant);
				let usersPoints = contestant.data;
				for(let X in usersPoints) {
					pointsArray.push(usersPoints[X].points);
					console.log("Here's All the users", usersPoints[X]);
				}
				let winnerArray = pointsArray.sort();
				winnerArray.reverse();
				console.log("pointsArray", winnerArray);
				let winner = winnerArray[0];
				for (let Y in usersPoints) {
					if (usersPoints[Y].points === winner){
						console.log(usersPoints[Y].uid, "WON!!!");
						let theBigWinner = usersPoints[Y].uid;
						authFactory.addTrophy(theBigWinner, monthDate);
						authFactory.removePoints(theBigWinner);
					} else {
						console.log(usersPoints[Y].uid, "didn't  win...");
						authFactory.removePoints(usersPoints[Y].uid);
					}
				}
			});
		});
	};




return{
	   checkHousehold,
	   getHousehold,
	   createHousehold,
	   getHouse,
	   addUserToHouse,
	   returnHousehold,
	   checkPulled,
	   getDay,
	   postDay,
	   getMonthDate,
	   postMonthDate,
	   awardTrophy
};

});







