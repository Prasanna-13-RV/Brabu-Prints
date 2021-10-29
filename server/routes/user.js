const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

router.get("/" , userController.view)
router.get("/admin" , adminController.view)

module.exports = router;