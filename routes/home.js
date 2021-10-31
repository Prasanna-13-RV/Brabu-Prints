const express = require("express");
const path = require("path");
const router = express.Router();
const methodOverride = require("method-override");
const multer = require("multer");
const mysql = require("mysql");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

router.get("/", (req, res) => {
	res.render("index")
})
router.get("/gallery", (req, res) => {
	res.render("gallery")
})
router.get("/blog", (req, res) => {
	res.render("blogs")
})

module.exports = router;
