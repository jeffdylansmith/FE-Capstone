# Chore Roulette
This single page web application gives users a way to take the thinking out of daily chores.  Users can create a household 
aFor my Front End Capstone, I built an app called Chore Roulette, which distributes chores among “household” members. Users 
log in using their Google credentials and create a household, and then add users and chores. The chores are assigned a day 
of the week and a point value based on estimated time to complete when they are created. Each day of the week when the first 
household user logs in, all of the household's chores for that day are pulled down and assigned randomly among the members of 
that household. As members complete tasks they are awarded points. Once they have completed all of their assigned chores, they 
are prompted to steal tasks from other members of their household if they choose. At the end of every month, the user with the 
most points is awarded a trophy. This single page application was built using Angular and jQuery, using Materialize for 
styling and a Google-Firebase database to persist data.  

## Getting Started

First, you will need to create your own Firebase database.  Head to to firebase.com and use your Google credintials to sign in
and set up a project.  Next, clone down the prject to your local system and in the app directory you will need to create an 
FBCreds.js file.  Next you will need to get the below info for you firebase and pate it into your FBCreds.js like so:

```
"use strict";

 app.constant('FBcreds', {
    apiKey: "",
    authDomain: "",
    databaseURL: ""
 });
```

### Prerequisites
You will need to have node package manager installed, a local http-server, and a text editor of your choice.


### Installing
Once you have all pre req's installed go to the project's lib directory in your terminal and run

```
npm install
```

and then in a open a new tab in the terminal and navigate back to the lib directory and run

```
grunt
```

Once grunt is running successfully you should be able to go to the the project's root directory and host the App.  :)

## Built With

* [AngularJs](https://angularjs.org/) - The web framework used
* [Angular-Materialize](https://krescruz.github.io/angular-materialize/) - The styling framework used
* [jQuery](https://jquery.com/) - used to simplify javascript code
* [Firebase](https://firebase.google.com/) - Used to persist data 

## Authors

* **Dylan Smith** - (https://www.linkedin.com/in/jeffdylansmith/)


## Acknowledgments

* Thanks to Nashville Software School!
