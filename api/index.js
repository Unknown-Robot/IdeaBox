const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");

console.clear();

// Initialization environmental variables.
dotenv.config({
    path: "./.env"
});

// Initialization moment
moment.locale("fr");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text({defaultCharset: "utf-8"}));
app.use(passport.initialize());

// DEBUG CORS ERROR LOCALHOST
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

require("./config/passport.js")(passport);

const rooterAuth = require("./routes/auth.js");
app.use("/login", rooterAuth);

const rooterUsers = require("./routes/users.js");
app.use("/users", rooterUsers);

const rooterPosts = require("./routes/posts.js");
app.use("/posts", rooterPosts);

app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS, () => {
    console.log(`The API is listening at this address : '${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}'`);
});

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_ADDRESS}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=${process.env.MONGODB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log("The API is connected to the MongoDB server at this address : '" + process.env.MONGODB_ADDRESS + ":" + process.env.MONGODB_PORT + "'"))
.catch(error => {throw error});

module.exports = app;