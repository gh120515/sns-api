# Social Network API

## Description

This JavaScript based application will allow the user to manage the back-end API of a social media website, using MongoDB to manage a NoSQL-based database.  The user can share their thoughts, react to their friends' thoughts, and create a friend list.

This app was built to test the builder's knowledge on managing a MongoDB database and the accompanying Mongoose ODM.



## Installation

It is assumed that the user of this app has some basic knowledge in code editing (the app itself can be used through the below steps).

The following are required to use this app:

1. Download the repository 

You can do this through the 'Code' button above this README; for example, you can clone the repository to your local machine.

![Options for downloading the repo](Assets/download.png)

2. Node.js

You can skip this step if you already have Node.js in your local machine - you can check your current version in your terminal through the below command:

    node -v

Otherwise, [this link](https://nodejs.dev/en/learn/how-to-install-nodejs/) will highlight some common options to install Node.js - do note that the process may vary between MacOS, Windows and Linux.

Functionality has been confirmed on Node.js version 16.20.0 & version 18.16.0. Note that other versions may not function as intended.

3. MongoDB

MongoDB will be required to manage the database. 

Refer to the [installation guide](https://www.mongodb.com/docs/manual/installation/) for full details.

## Usage

After performing the basic setup, open the repository that you downloaded / cloned - you can do this in multiple ways, such as through the terminal.

The most convinient method is through VS Code (source-code editor program), which has a function where you can directly open the terminal in the directory (e.g.) right-click on the root directory folder, then select 'Open in Integrated Terminal'.

![Screenshot of the directory, where you can open the integrated terminal](Assets/directory.png)

After opening the repository directory, do the following:

1. Open the terminal in the root directory folder

Then, enter the following to run the app:

```
    <!-- npm i (install) only required for the initial run (will install required dependencies) -->
    npm i && npm start

    <!-- seeding the database (setting up sample data for the database) -->
    npm run seed

    <!-- on subsequent runs: -->
    npm start
```    

2. Access the database through API GET / POST / PUT / DELETE routes

This can be done in various ways - example include through the API Client [Insomnia](https://insomnia.rest/), with a sample screenshot of the POST route below.

![Sample screenshot of accessing the API POST route using Insomnia](Assets/insomnia.png)

3. Seed sample data

The database at initial install will be empty; use the below POST routes to populate the database with your users, thoughts and reactions (some sample data below).

* Add users


```
    /api/users

    // Sample JSON for user data
    {
        "username": "homer",
        "email": "homer_simpson@gmail.com"
    }
```    

* Add thoughts

```
    /api/thoughts/:thoughtId

    // Sample JSON for thought data (make sure to change the username & user ID with the generated ID!)
    {
        "thoughtText": "Had an amazing time at the concert last night! 🎶 The energy was electric, and the band rocked the stage! #LiveMusic #ConcertExperience",
        "username": "homer",
        "userId": "(insert your ID)"
    }
```    

* Add reactions to thoughts

```
    /api/thoughts/:thoughtId/reactions/:reactionId

    // Sample JSON for reaction data ()
    {
        "reactionBody": "Here's my take...",
        "username": "homer"
    }
```

## Tests

Below are the functional REST API call routes which can be tested using API testing apps such as Insomnia.

```
* GET / POST users

    /api/users

* GET / PUT / DELETE user by their unique ID

    /api/users/:userId

* POST / DELETE a friend by a user's ID

    /api/users/:userid/friends/:friendId

* GET all thoughts, POST a thought (by a user)

    /api/thoughts/

* GET / PUT / DELETE a thought by its ID

    /api/thoughts/:thoughtId

* POST a new reaction by a thought's ID

    /api/thoughts/:thoughtId/reactions

* DELETE a reaction by its ID

    /api/thoughts/:thoughtId/reactions/:reactionId
```    

### Demonstration

[Walkthrough Video](https://drive.google.com/file/d/1PEyD-0p671BTedvW3UFJ3aibHdkqrGOI/view)

## Credits

Guidelines by University of Adelaide.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)