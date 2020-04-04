const express = require("express");
const router = express.Router();
const passport = require("passport");
const API = require("../controllers/api_controllers.js");
const Users_Schema = require("../models/users.js");

router.post("/create", API.create(Users_Schema));
router.get("/list", passport.authenticate("jwt", { session: false }), API.list(Users_Schema));
router.get("/:id", passport.authenticate("jwt", { session: false }), API.get(Users_Schema));
router.put("/:id/update", passport.authenticate("jwt", { session: false }), API.update(Users_Schema));
router.patch("/:id/restore", passport.authenticate("jwt", { session: false }), API.restore(Users_Schema));
router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), API.delete(Users_Schema));

module.exports = router;