"use strict";

app.factory("authFactory", function($q, $http, FBcreds) {
	let currentUser = null,
		currentUserName = null;

	let authWithProvider = function(provider){
	  return firebase.auth().signInWithPopup(provider);
	};

    const addUser = (uid, newUser) => {
      return $q((resolve, reject) => {
	      console.log("authFactory", newUser);
	      let newObject = JSON.stringify(newUser);
	      $http.patch(`${FBcreds.databaseURL}/users/${uid}/.json`, newUser)
	      .then ((itemID) => {
	        resolve(itemID);
	      })
	      .catch((error) => {
	        reject(error);
	      });
      });
    };

    let logoutUser = function(){
       console.log("logoutUser");
       return firebase.auth().signOut();
    };

    let isAuthenticated = function (){
        console.log("authFactory: isAuthenticated");
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    currentUser = user.uid;
                    currentUserName = user.displayName;
                    console.log("user", user.uid);
                    resolve(true);
                }else {
                    resolve(false);
                }
            });
        });
    };

    let getUser = function(){
        return currentUser;
    };

    let getUserHousehold = (uid) => {
    	return $q((resolve, reject) => {
    		$http.get(`${FBcreds.databaseURL}/users/${uid}/householdId.json`)
    		.then((response) => {
                console.log("authfactory House Response", response.data);
    			resolve(response.data);
    		})
    		.catch((error) => {
    			reject(error);
    		});
    	});
    };

    return {authWithProvider, addUser, logoutUser, isAuthenticated, getUser, getUserHousehold};
});