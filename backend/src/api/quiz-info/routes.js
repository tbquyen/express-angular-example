const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/:quizId/:index", controller.getQuiz);
router.put("/", controller.update);

module.exports = router;