const express = require("express");
const router = express.Router();
const Auth = require(__basedir + "/controllers/auth.js");

router.post("/", Auth.login);

module.exports = router;