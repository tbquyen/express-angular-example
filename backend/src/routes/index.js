const passport = require("passport");
const express = require("express");
const router = express.Router();

router.use("/login", require("../api/login/routes"));
router.use("/password", require("../api/password/routes"));

router.use(
  "/home",
  passport.authenticate('jwt', { session: false }),
  require("../api/home/routes"),
);

router.use(
  "/users",
  passport.authenticate('jwt', { session: false }),
  require("../api/users/routes"),
);

router.use(
  "/questions",
  passport.authenticate('jwt', { session: false }),
  require("../api/questions/routes"),
);

module.exports = router;
