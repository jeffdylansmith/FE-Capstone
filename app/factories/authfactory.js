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
                    currentUserName = user.name;
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

    let getUserName = function(){
        return currentUserName;
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

    let getHouseholdMembers = (houseId) => {
        console.log("house ID as;ldkjf", houseId);
        return $q((resolve, reject) => {
        $http.get(`${FBcreds.databaseURL}/users/.json?orderBy="householdId"&&equalTo="${houseId}"`)
            .then((response) => {
                console.log("house members", response);
                resolve(response);
            });
        });
    };

    let getUserObj = (uid) => {
        console.log("uid", uid);
        return $q((resolve, reject) => {
            $http.get(`${FBcreds.databaseURL}/userProfiles/.json?orderBy="uid"&&equalTo="${uid}"`)
            .then((userObj) => {
                console.log("userobj", userObj);
                resolve(userObj.data[uid]);
            });
        });
    };

    let patchUser = (updatedUser, newUid) => {
        return $q((resolve, reject) => {
        let newUser = JSON.stringify(updatedUser);
        $http.patch(`${FBcreds.databaseURL}/users/${newUid}/.json`, newUser)
          .then ((itemID) => {
            resolve(itemID);
          });
        });
    };

    let putUserProfile = (newUserProfile) => {
        return $q((resolve, reject) => {
            let newUserPro = JSON.stringify(newUserProfile);
            $http.put(`${FBcreds.databaseURL}/userProfiles/${currentUser}/.json`, newUserPro)
            .then((answer) => {
                console.log("answer", answer);
                resolve(answer);
            });
        });
    };

    let addPoints = (X) => {
        console.log("authfactory points X", X);
        return $q((resolve, reject) => {
            getUserObj(currentUser)
            .then((userObject) => {
                console.log("userObject", userObject);
                let userNewPoints = parseInt(userObject.points) + parseInt(X);
                console.log("newPoints", userNewPoints);
                userObject.points = userNewPoints;
                putUserProfile(userObject);
            });
            resolve("all good");
        });
    };

    return {authWithProvider, addUser, logoutUser, isAuthenticated, getUser, getUserHousehold, getHouseholdMembers, getUserName, getUserObj, patchUser, addPoints};
});