/**
 * Required External Modules and Interfaces
 */
import express from "express";
import * as validator from "./validator";
import * as controller from "./controller";

/**
 * Router Definition
 */
const router = express.Router();

/**
 * Controller Definitions
 */
router.put("/", validator.changepassword, controller.changepassword);

export default router;
