# node-express-mongodb-app

This application goes along with the Build a basic web application with Node.js and Express video tutorial
And corresponding CheatSheet available for download (must have the CheatSheet Desktop App for Mac).
https://www.learnbycheating.com/guides/nodejs

This is a very basic blog app with a single collection: articles.

It uses the mongodb database.
You must have mongodb installed on your computer or have a cloud account.

Create an evironmental variable file called .env in the project's root directory: 
touch .env

And populate it with the database uri such as:
MONGODB_URI=mongodb://localhost:27017/my_local_db

To run the app in your development environment you must have Node.js installed. 

First install all packages. From the command line in the project root directory run: npm install

In another Terminal window (any directory) start mongodb: mongod

Then start the node server from the command line in the project folder: npm start

  Or if nodemon is installed: nodemon

Then view the app in the browser at: http://localhost:3000