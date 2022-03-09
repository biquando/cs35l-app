# Bubbles
An event-based messaging app designed for students.

## How to get started
This app requires Node.js and a MongoDB Atlas or local database.

Clone the directory by running
`git clone 'https://github.com/biquando/cs35l-app'`.

## Setting up the back-end server

First, `cd` into `api/`. Here, you will need to install
modules and set up environment variables.

Run `npm install` to automatically install modules for the back end.

In the current directory, create a file named `.env`. This file will hold
configuration variables for the server. With your favorite text editor,
put the following in this file:
```
MONGODB_ATLAS_URI=<your atlas url>
SALT_ROUNDS=10
ACCESS_TOKEN_SECRET=somesecretstring
REFRESH_TOKEN_SECRET=someothersecretstring
```
Replace `<your atlas url>` with the url of your MongoDB atlas database
(without the angle brackets). You can also use the address of a locally
running database.

To start the server, run `npm start`.

## Setting up the front end

In another terminal, `cd` into `cs35l-app/client/`.

Run `npm install` to automatically install modules for the front end.

To start the server, run `npm start`. The app will be running at
`localhost:3000`, or possibly another port if 3000 is already in use.
