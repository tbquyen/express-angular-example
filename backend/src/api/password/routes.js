const express = require("express");
const passport = require("passport");
const validator = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.put("/", validator.changepassword, controller.changepassword);

module.exports = router;
