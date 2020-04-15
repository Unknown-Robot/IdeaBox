const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");
const path = require("path");
/*

	PRODUCTION : 
		- https://expressjs.com/fr/advanced/best-practice-performance.html

    TODO :
		- Add update profile-pic react app's

*/

/**
 * 	Environement variables configuration.
 */

const _env = dotenv.config({
	path: __dirname + "/.env"
});

if(_env.error) throw _env.error;
else global.__basedir = __dirname;

if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {
	app.set("trust proxy", 1);
}
else if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
    app.use(function(req, res, next) { // DEBUG CORS ERROR LOCALHOST
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
	console.clear();
}

/**
 * 	Initialization moment configuration.
 */

moment.locale("fr");

/**
 * 	urlencoded configuration.
 */

app.use(bodyParser.urlencoded({extended: false}));

/**
 * 	JSON Express configuration.
 */

app.use(bodyParser.json());

/**
 * 	Default charset Express configuration.
 */

app.use(bodyParser.text({defaultCharset: "utf-8"}));

/**
 * 	Password configuration.
 */

app.use(passport.initialize());
require(__basedir + "/config/passport.js")(passport);

/**
 * 	Static public directory configuration.
 */

app.use(express.static(path.join(__dirname, "public")));

/**
 * 	Routers path configuration.
 */

const rooterAuth = require(__basedir + "/routes/auth.js");
app.use("/login", rooterAuth);

const rooterUsers = require(__basedir + "/routes/users.js");
app.use("/users", rooterUsers);

const rooterPosts = require(__basedir + "/routes/posts.js");
app.use("/posts", rooterPosts);

/**
 *	Launch server with Express.
 */

app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS, () => {
    console.log(`The API is listening at this address : '${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}'`);
});

/**
 * 	Mongoose (MongoDB) configuration.
 */

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_ADDRESS}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=${process.env.MONGODB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log("The API is connected to the MongoDB server at this address : '" + process.env.MONGODB_ADDRESS + ":" + process.env.MONGODB_PORT + "'"))
.catch(error => {throw error});

module.exports = app;