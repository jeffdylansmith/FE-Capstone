"use strict";

const app = angular.module("Capstone", ["ngRoute"]);

let isAuth = (authFactory, $location) => new Promise ((resolve, reject) => {
	authFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log("Authenticated, yay!");
			resolve();
		}else {
			console.log("Authentication REJECTED");
			reject();
			$location.path('/');
		}
	});
});

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
        templateUrl: 'partials/landing.html',
        controller: 'AuthPageCtrl'
    })
    .when('/firstTime', {
        templateUrl: 'partials/joinorCreateNew.html',
        controller: 'joinorCreateNewCtrl',
        resolve:{isAuth}
    })
    .when('/householdOverview', {
        templateUrl: 'partials/householdOverview.html',
        controller: 'householdOverviewCtrl',
        resolve: {isAuth}
    })
    .when('/allHouseholdTasks', {
        templateUrl: 'partials/allHouseholdTasks.html',
        controller: 'allHouseholdTasksCtrl',
        resolve: {isAuth}
    })
    .when('/addTask', {
        templateUrl: 'addTask.html',
        controller: 'addTaskCtrl',
        resolve: {isAuth}
    })
    .otherwise('/');
});


    app.run(($location, FBcreds) => {
    let creds = FBcreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});