const express = require("express");
const validator = require("./validator");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", validator.insert, controller.insert);
router.put("/", validator.update, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
