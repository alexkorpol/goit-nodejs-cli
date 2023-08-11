const express = require("express");
const router = express.Router();
const controllers = require("./files");

router.post("/", controllers.createFile);
router.get("/", controllers.getFiles);
router.get("/:fileName", controllers.getInfo);

module.exports = router;
