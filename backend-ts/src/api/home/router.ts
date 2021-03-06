/**
 * Required External Modules and Interfaces
 */
import * as controller from "./controller";
import express from "express";

/**
 * Router Definition
 */
const router = express.Router();

/**
 * Controller Definitions
 */
router.get("/", controller.home);

export default router;
