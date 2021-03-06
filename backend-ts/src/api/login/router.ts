/**
 * Required External Modules and Interfaces
 */
import * as controller from "./controller";
import passport from "passport";
import express from "express";
import * as validator from "./validator";

/**
 * Router Definition
 */
const router = express.Router();

/**
 * Controller Definitions
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.authorization
);
router.post("/", validator.login, controller.login);
router.delete("/", controller.logout);

export default router;
