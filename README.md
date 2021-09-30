# Hobby Tracker App Front End
> This is the front end for a hobby tracking app that allows users to manage their miniature wargaming related projects. It is part of a complete app (WIP) that can be found [_here_](https://github.com/thomas-dunlop/hobby-project-manager-back-end). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
I wanted to A) build something that solidified my back-end knowledge B) learn one or two new technologies, C) actually build something useful to me. This project is the front end portion of a hobby project tracking web app for managing my personal projects and fulfilling those goals. It is my first time using react, satisfying goal B). The full project is in progress and can be found [_here_](https://github.com/thomas-dunlop/hobby-project-manager-back-end). 


## Technologies Used
- React - version 17.0.2
- Font Awesome - version 1.2.36
- React Bootstrap - version 2.0.0-rc.0


## Features
This front end allows a user to:
-	Keep track of projects, including their name, description, related notes, and their associated hobby recipes. 
-	Keep track of hobby recipes, including their name, description, and required materials (paint, glue, etc), and steps. The user can link hobby recipes to multiple projects (for instance if you use the same true metal armor recipe accross multipe armies). 
- Keep track of material including their name, part number, re-order link, etc. The user can link materials to multiple hobby recipes. The user can also keep track of various lots of materials. 


## Setup
To view the front end, simply download the repository. You can then run the following commands in the project directory: 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Project Status
Project is: _in progress_ 


## Room for Improvement
Room for improvement:
- Kanban board to allow for model tracking. Should allow the user to track which models they need, purchased, assembled, painted, and finished. 
- Allow table items to be added inline instead of using a form in a modal. 

To do:
- Need to add fetch commands to retrieve data from the back end. Current data is spaceholder for demonstration purposes. 
- Need to app POST capability to forms to allow for submitting new data. 
- Need to add delete capability to delete buttons. 
