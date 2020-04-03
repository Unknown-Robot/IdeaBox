const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const passport = require("passport");

console.clear();

// Initialization environmental variables.
dotenv.config({
    path: "./.env"
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text({defaultCharset: "utf-8"}));
app.use(passport.initialize());

require("./config/passport.js")(passport);

const rooterAuth = require("./routes/auth.js");
app.use("/login", rooterAuth);

const rooterUsers = require("./routes/users.js");
app.use("/users", rooterUsers);

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_ADDRESS}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=${process.env.MONGODB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log("Mongoose connected to '" + process.env.MONGODB_ADDRESS + "'"))
.catch(error => {throw error});

app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS, () => {
    console.log(`App listening on port ${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`);
});

module.exports = app;