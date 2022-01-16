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

router.get("/category/:id", controller.getQuestions);
router.get("/:id", controller.getQuestion);
router.post("/", validator.insert, controller.insert);
router.put("/", validator.update, controller.update);
router.delete("/:id", controller.remove);

export default router;
