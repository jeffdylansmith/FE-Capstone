"use strict";

app.controller("userTodayTasksCtrl", function($scope, authFactory, $window, $location, $http, FBcreds, $q, DataFactory, ChoreFactory){
 console.log("you've got all tasks");

 let allHouseTasks = [];
 $scope.choresDone = false;
 $scope.allDone = false;

 let getUserHouseholdTasks = (X) => {
	let currentuser = authFactory.getUser();
	console.log("getallhousetasks response", currentuser);
 	DataFactory.getHousehold(currentuser)
 	.then((user) => {
 		console.log("Today's chores user name", user);
	console.log("getUserHouseholdTasks", user);
 	ChoreFactory.getUserHouseholdChores(currentuser)
 		.then((tasks) => {
 			$scope.chores = tasks;
	 			if(tasks <= 0){
	 				console.log("ready to steal!");
	 				$scope.choresDone = true;
	 			} else {
	 				console.log("yep", tasks);
	 				$scope.choresDone = false;
	 				
	 			}
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

 $scope.stealTask = () => {
 	let currentuser = authFactory.getUser();
 	DataFactory.getHousehold(currentuser)
 	.then((response) => {
		ChoreFactory.stealTask(response, currentuser)
		.then((answer) => {
			console.log("CtrlAnswer", answer);
			if(answer === true){
				$scope.choresDone = false;
				getUserHouseholdTasks();
			} else {
				 $scope.allDone = true;
				 $scope.choresDone = false;
				console.log("Good Job!! There are no more tasks to be done!");
			}
		});
	});
 };

getUserHouseholdTasks();
});