const express = require("express");
const passport = require("passport");
const validator = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.post("/", validator.login, controller.login);
router.delete("/", controller.logout);
router.get("/", passport.authenticate('jwt', { session: false }), controller.authorization)

module.exports = router;