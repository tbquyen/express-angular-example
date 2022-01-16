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
router.get("/", controller.getQuizs);
router.get("/:id", controller.getQuiz);
router.post("/", validator.insert, controller.insert);
router.put("/", validator.update, controller.update);
router.delete("/:id", controller.remove);

export default router;
