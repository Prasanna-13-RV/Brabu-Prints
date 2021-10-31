const express = require("express");
const path = require("path");
const router = express.Router();
const methodOverride = require("method-override");
const multer = require("multer");
const mysql = require("mysql");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const mysqlConnection = require("../database")

router.get("/", (req, res) => {
	mysqlConnection.query("SELECT * FROM clients", (err, rows, fields) => {
		if (!err) {
			res.render("index", { data: rows })
		}
		else {
			console.log(err);
		}
	});
})

router.get("/gallery", (req, res) => {
	mysqlConnection.query("SELECT gallery_image FROM gallerys", (err, rows, fields) => {
		if (!err) {
			res.render("gallery", { data: rows })
		}
		else {
			console.log(err);
		}
	});
})
router.get("/blog", (req, res) => {
	res.render("blogs")
})

module.exports = router;
