"use strict";

app.factory("DataFactory", function($q, $http, FBcreds, $location){

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
		$http.get(`${FBcreds.databaseURL}/households.json?orderBy="user"&equalTo="${userId}"`)
		.then((household) => {
			return household;
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


return{checkHousehold, getHousehold, createHousehold, getHouse, addUserToHouse};

});







