const mysql = require("mysql");
const express = require("express");
const path = require("path");
const router = express.Router();
const methodOverride = require("method-override");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const fs = require('fs');
const mysqlConnection = require("../database");

router.get('/', function (req, res, next) {
	mysqlConnection.query("SELECT * FROM clients", (err, rows, fields) => {
		if (!err) {
			res.render("./admin/ourclient", { data: rows })
		}
		else {
			console.log(err);
		}
	});
});


// create client
router.get("/create", (req, res) => {
	res.render("./admin/clientCreate")
})
router.post("/create", upload.fields([
	{ name: "client_logo" },
	{ name: "client_poster" },
]), (req, res) => {
	mysqlConnection.query("INSERT INTO clients (client_name, client_logo, client_poster) values(?,?,?)", [req.body.client_name, req.files["client_logo"][0].path, req.files["client_poster"][0].path], (err, rows, response) => {
		if (!err) {
			res.render("./admin/clientconform")
		} else {
			console.log(err);
		}
	})
});


// view client
router.get("/:id", (req, res) => {
	mysqlConnection.query("SELECT * FROM clients WHERE id = ?", [req.params.id], (err, row, fields) => {
		if (!err) {
			res.render("./admin/clientview", { data: row })
		}
		else {
			console.log(err)
		}
	})
});

// update client
router.get("/update/:id", (req, res) => {
	mysqlConnection.query("SELECT * FROM clients", (err, rows) => {
		if (!err) {
			res.render("./admin/clientupdate", { data: rows })
		}
		else {
			console.log(err)
		}
	})
})
router.post("/:id", (req, res) => {
	mysqlConnection.query("UPDATE clients SET client_name=? , client_logo=? , client_poster=? WHERE id=?", [req.body.client_name, req.file.path, req.file.path, req.params.id], (err, rows) => {
		if (!err) {
			mysqlConnection.query("SELECT * FROM clients WHERE id = ?", [req.params.id], (err, rows) => {
				if (!err) {
					res.render("./admin/clientview", { data: rows })
				} else {
					console.log(err)
				}
			})
		}
		else {
			console.log(err)
		}
	})
})



// delete client
router.get("/delete/:id", async (req, res) => {
	mysqlConnection.query("DELETE FROM clients WHERE id = ?", [req.params.id], async (err, rows) => {
		if (!err) {
			console.log(req.query);
			const url1 = req.query.client_logo.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
			const url2 = req.query.client_poster.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
			console.log(url2)
			// await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url);
			// const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
			await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url1);
			await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url2);
			res.redirect("/admin/client")
		}
		else {
			console.log(err);
		}
		console.log(rows)
	})
})


module.exports = router;