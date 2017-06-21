"use strict";

app.controller("userTodayTasksCtrl", function($scope, authFactory, $window, $location, $http, FBcreds, $q, DataFactory, ChoreFactory, $moment){
	console.log("this is user today tasks");
	let thecurrentUser = authFactory.getUser();
	let today = $moment().format('dddd');
	$scope.todayTasks = [];

	let populatePage = () => {

	};


});