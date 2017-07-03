"use strict";

app.controller("userTodayTasksCtrl", function($scope, authFactory, $window, $location, $http, FBcreds, $q, DataFactory, ChoreFactory){
 console.log("you've got all tasks");

 let allHouseTasks = [];

 let getUserHouseholdTasks = (X) => {
	let currentuser = authFactory.getUser();
	console.log("getallhousetasks response", currentuser);
 	DataFactory.getHousehold(currentuser)
 	.then((user) => {
 		console.log("Today's chores user name", user);
	console.log("getUserHouseholdTasks", user);
 	ChoreFactory.getUserHouseholdChores(currentuser)
 		.then((tasks) => {
 			console.log(tasks);
 			$scope.chores = tasks;
 			});
 		});
 	};

 	$scope.deleteDailyTask = (Xpoints, Y) => {
 		console.log("X", Xpoints);
 		authFactory.addPoints(Xpoints)
 		.then((Hey) => {
 		ChoreFactory.deleteDailyChore(Y)
	 		.then((response) => {
	 			console.log(response);
	 			getUserHouseholdTasks();
	 		});
 		});
 	};



getUserHouseholdTasks();
});