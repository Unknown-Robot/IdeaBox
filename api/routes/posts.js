const express = require("express");
const router = express.Router();
const passport = require("passport");
const API = require("../controllers/api_controllers.js");
const Posts_Schema = require("../models/posts.js");

router.post("/create", passport.authenticate("jwt", { session: false }), API.create(Posts_Schema));
router.get("/list", passport.authenticate("jwt", { session: false }), API.list(Posts_Schema));
router.get("/:id", passport.authenticate("jwt", { session: false }), API.get(Posts_Schema));
router.put("/:id/update", passport.authenticate("jwt", { session: false }), API.update(Posts_Schema));
router.patch("/:id/restore", passport.authenticate("jwt", { session: false }), API.restore(Posts_Schema));
router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), API.delete(Posts_Schema));

module.exports = router;