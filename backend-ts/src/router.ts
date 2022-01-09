/**
 * Required External Modules and Interfaces
 */
import passport from "passport";
import express from "express";
import loginRouter from "./api/login/router";
import homeRouter from "./api/home/router";

/**
 * Router Definition
 */
const router = express.Router();

// login
router.use("/login", loginRouter);

// home
router.use(
  "/home",
  passport.authenticate("jwt", { session: false }),
  homeRouter
);

export default router;
