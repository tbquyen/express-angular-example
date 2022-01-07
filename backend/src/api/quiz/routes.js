const multer = require("multer");
const express = require("express");
const validator = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.getQuizs);
router.get("/:id", controller.getQuiz);
router.post("/", validator.insert, controller.insert);
router.put("/", validator.update, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
