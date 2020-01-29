# ReactSocialWebsite

A Social Website created using React, Redux and Firestore. <br/> 
Website link: <a href="https://socialapp-2b1be.firebaseapp.com/" target="_blank">https://socialapp-2b1be.firebaseapp.com/</a>

## Overview

This is the full code for 'ReactSocialWebsite'. This code is a Social Website to view, like and comment on posts after registration. The Website utilizes React for UI interfaces, Redux for centralized state management and Firestore to store data.

<img width="450" src="https://user-images.githubusercontent.com/20180559/73256724-75098e00-41e8-11ea-8926-e32cca8b8732.png"/> <img width="400" height="270" src="https://user-images.githubusercontent.com/20180559/73256131-666ea700-41e7-11ea-9a08-2384845df6ef.png"/>

## Features

- View posts without logging in
- Create or delete a post
- Like, unlike or comment on a post
- Notifications for each action
- Update profile details

## Setup 

1. Install Nodejs (https://nodejs.org/en/download/)
2. Open Node.js command prompt and run the following command in the main directory <br/>
`npm install -g firebase-tools`
3. Initialize firebase and install necessary packages.
4. To deploy functions, go to the functions directory and run <br>`firebase deploy`
5. To run client, go to the client directory and run <br>`npm start`
6. To deploy client, run the following commands: <br>
```
npm run build
firebase deploy
```
**(Make sure to enable functions, firestore and hosting in Firebase)**
