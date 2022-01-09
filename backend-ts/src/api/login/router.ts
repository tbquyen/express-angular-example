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

// GET /
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.authorization
);

// POST /
router.post("/", validator.login, controller.login);

// DELETE /
router.delete("/", controller.logout);

export default router;
