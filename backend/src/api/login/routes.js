const express = require("express");
const passport = require("passport");
const validator = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.post("/", validator.login, controller.login);
router.get("/", passport.authenticate('jwt', { session: false }), controller.authorization)

module.exports = router;
