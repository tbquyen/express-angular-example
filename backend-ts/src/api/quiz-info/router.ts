/**
 * Required External Modules and Interfaces
 */
import * as controller from "./controller";
import express from "express";
import * as validator from "./validator";

/**
 * Router Definition
 */
const router = express.Router();

/**
 * Controller Definitions
 */
router.get("/:quizId/:index", controller.getQuiz);
router.put("/", controller.update);

export default router;
