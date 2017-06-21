"use strict";

app.factory("ChoreFactory", function($q, $http, FBcreds, $location, authFactory){
//getAllHouseholdChores, getUserChores, getUsersChoresForToday, addChore, editChore

	const addNewChore = (newChoreObj) => {
		let user = authFactory.getUser();
		return $q((resolve, reject) => {
			let newChore = JSON.stringify(newChoreObj);
			$http.post(`${FBcreds.databaseURL}/chores/.json`, newChore)
			.then((response) => {
				resolve(response);
			});
			//$location.path("/");
		});
	};

	const getAllHouseholdChores = (houseId) => {
		let chores = [];
		console.log("Yah!", houseId);
		//let houseName = houseId;
		console.log("houseName",houseId);
		return $q ((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/chores/.json?orderBy="householdId"&equalTo="${houseId}"`)
			.then((taskList) => {
				let itemCollection = taskList.data;
				console.log("itemCollection", itemCollection);
				Object.keys(itemCollection).forEach((key) => {
				itemCollection[key].choreId = key;
        		chores.push(itemCollection[key]);
			});
			resolve(chores);
		});
		});
	};

	const getChore = (choreId) => {
		console.log("choreFactory getChore ChoreId =", choreId);
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/chores/${choreId}/.json`)
			.then((response) => {
				console.log("task to be edited", response);
				resolve(response);
			});
		});
	};

	const patchChore = (choreId, chore) => {
		return $q((resolve, reject) => {
		let newChore = JSON.stringify(chore);
		$http.patch(`${FBcreds.databaseURL}/chores/${choreId}/.json`, newChore)
			.then((response) => {
				resolve(response);
			});
		});
	};

	const deleteChore = (choreId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBcreds.databaseURL}/chores/${choreId}/.json`)
			.then((response) => {
				resolve(response);
			});
		});
	};

	const getDayChores = (day, houseId) => {
		let todaysChores = [];
		console.log("dailyChorePull day + household", day, houseId);
		return $q((resolve, reject) => {
		$http.get(`${FBcreds.databaseURL}/chores/.json?orderBy="householdId"&equalTo="${houseId}"`)
			.then((response) => {
				console.log("getdaychores response", response);
				let allChores = response.data;
				console.log("allChores", allChores);
				for (var x in allChores) {
					console.log("XXX", allChores[x]);
					if (allChores[x].day === day){
						todaysChores.push(allChores[x]);
					}
				}
				resolve(todaysChores);
				console.log("today's chores", todaysChores);
			});
		});
	};

	const postTodayChores = (freshChores) => {
		console.log("freshChores", freshChores);
		let todayChores = JSON.stringify(freshChores);
		for (var X in freshChores) {
			let todayChores = JSON.stringify(freshChores[X]);
			$http.post(`${FBcreds.databaseURL}/todayChores/.json`, todayChores);
		}
	};

	const getTodayChore = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBcreds.databaseURL}/todayChores/.json?orderBy="user"`)
			.then((response) => {
				console.log("my chores for today", response);
				resolve(response);
			});
		});
	};

	let houseMembers = [];

	const assignDailyChores = (dailyChores, house) => {
		let TodaysassignedChores = {};
		console.log("assign dailyChores", dailyChores, house);
		return $q((resolve, reject) => {
		authFactory.getHouseholdMembers(house)
			.then((members) => {
				console.log("members", members);
				pushPlayas(members.data)
				.then((X) => {
					console.log("assign members", houseMembers);
					for (let chore in dailyChores){
						//let newChoreObj = dailyChores[chore];
						console.log("asdfjljdflkj members", dailyChores[chore].title);
						let shuffler = Math.floor((Math.random() * houseMembers.length));
						console.log("suffler", shuffler);
						console.log("member shuffle", houseMembers[shuffler].name);
						dailyChores[chore].assignedTo = houseMembers[shuffler].name;
					}
					console.log("newChoreObj", dailyChores);
					postTodayChores(dailyChores);
				});
			});
		});
	};

	let pushPlayas = (members) => {
		return $q((resolve, reject) => {
			console.log("pushplayas", members);
			for(let playa in members){
				houseMembers.push(members[playa]);
			}
			resolve("done");
		});
	};

 	return {addNewChore, getAllHouseholdChores, getChore, patchChore, deleteChore, getDayChores, postTodayChores, assignDailyChores};

});



