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
router.get("/", controller.getUsers);

// GET by id /
router.get("/:id", controller.getUser);

// POST /
router.post("/", validator.insert, controller.insert);

// PUT /
router.put("/", validator.update, controller.update);

// DELETE /
router.delete("/:id", controller.remove);

export default router;
