"use strict";

app.controller("allHouseholdTasksCtrl", function($scope, authFactory, $window, $location, $http, FBcreds, $q, DataFactory, ChoreFactory){
 console.log("you've got all tasks");

 let allHouseTasks = [];

 let getAllHouseholdTasks = (X) => {
	let currentuser = authFactory.getUser();
	console.log("getallhousetasks response", currentuser);
 	DataFactory.getHousehold(currentuser)
 	.then((user) => {
	console.log("getAllHouseholdTasks", user);
 	ChoreFactory.getAllHouseholdChores(user)
 		.then((tasks) => {
 			console.log(tasks);
 			$scope.chores = tasks;
 			});
 		});
 	};

 	let getHouseMembers = () => {
 		let currentuser = authFactory.getUser();
		console.log("getallhousetasks response", currentuser);
 		DataFactory.getHousehold(currentuser)
 		.then((answer) => {
 			authFactory.getHouseholdMembers(answer)
 			.then((answer2) => {
 				$scope.houseMembers = answer2.data;
 			});

 		});
 	};

 	$scope.deleteTask = (X) => {
 		ChoreFactory.deleteChore(X)
 		.then((response) => {
 			console.log(response);
 			getAllHouseholdTasks();
 		});
 	};



getAllHouseholdTasks();
getHouseMembers();
});