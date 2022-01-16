/**
 * Required External Modules and Interfaces
 */
import passport from "passport";
import express from "express";
import loginRouter from "./api/login/router";
import passwordRouter from "./api/password/router";
import homeRouter from "./api/home/router";
import usersRouter from "./api/users/router";
import categoriesRouter from "./api/categories/router";
import questionsRouter from "./api/questions/router";
import quizRouter from "./api/quiz/router";
import quizinfoRouter from "./api/quiz-info/router";

/**
 * Router Definition
 */
const router = express.Router();

// login
router.use("/login", loginRouter);
router.use("/password", passwordRouter);

// home
router.use(
  "/home",
  passport.authenticate("jwt", { session: false }),
  homeRouter
);

// users master
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

// categories master
router.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  categoriesRouter
);

router.use(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  questionsRouter
);

router.use(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  quizRouter
);

router.use(
  "/quiz-info",
  passport.authenticate("jwt", { session: false }),
  quizinfoRouter
);

export default router;
