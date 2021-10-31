const multer = require("multer");
const express = require("express");
const validator = require("./validator");
const controller = require("./controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const router = express.Router();

router.get("/", controller.getQuestions);
router.get("/:id", controller.getQuestion);
router.post("/", validator.insert, controller.insert);
router.post("/upload", upload.single("file"), controller.upload);
router.put("/", validator.update, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
