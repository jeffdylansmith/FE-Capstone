"use strict";

app.controller("addTaskCtrl", function($scope, DataFactory, ChoreFactory, authFactory, $location, $routeParams){
	console.log("add Task Ctrl");

	let user = authFactory.getUser();

	$scope.task = {};

	$scope.buildNewTask = () => {
		authFactory.getUserHousehold(user)
		.then((answer) => {
			console.log("answer", answer);
			$scope.task.householdId = answer;
			console.log("new task", $scope.task);
			ChoreFactory.addNewChore($scope.task)
				.then((X) => {
					console.log("task added", X);
					$location.path("/allHouseholdTasks");
				});
		});

	};

	$scope.updateTask = (A, B) => {
		ChoreFactory.patchChore(A, B)
		.then((Fire) => {
			$location.path("/allHouseholdTasks");
			console.log("Fire", Fire);
		});
	};



	console.log("routeParams", $routeParams.choreId);
	if($routeParams.choreId === undefined){
		$scope.saveOrSubmit = false;
	} else{
		$scope.saveOrSubmit = true;
		$scope.Id = $routeParams.choreId;
	}

	ChoreFactory.getChore($routeParams.choreId)
	.then((chore) => {
		console.log("chore", chore);
		if(chore){
			$scope.task = chore.data;
		}
	});

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



getHouseMembers();
});