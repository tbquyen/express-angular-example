const passport = require("passport");
const express = require("express");
const router = express.Router();

router.use("/login", require("../api/login/routes"));
router.use("/password", require("../api/password/routes"));

router.use(
  "/home",
  passport.authenticate("jwt", { session: false }),
  require("../api/home/routes")
);

router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  require("../api/users/routes")
);

router.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  require("../api/categories/routes")
);

router.use(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  require("../api/questions/routes")
);

router.use(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  require("../api/quiz/routes")
);

router.use(
  "/quiz-info",
  passport.authenticate("jwt", { session: false }),
  require("../api/quiz-info/routes")
);

module.exports = router;
