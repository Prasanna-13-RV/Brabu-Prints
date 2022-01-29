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
const { isloggedin } = require("../middleware");


router.get('/', isloggedin, function (req, res, next) {
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
router.get("/create", isloggedin, (req, res) => {
	res.render("./admin/clientCreate")
})
router.post("/create", isloggedin, upload.fields([
	{ name: "client_logo" },
	{ name: "client_poster" },
]), (req, res) => {
	console.log(req.files)
	mysqlConnection.query("INSERT INTO clients (client_name, client_logo, client_poster) values(?,?,?)", [req.body.client_name, req.files["client_logo"][0].path, req.files["client_poster"][0].path], (err, rows, response) => {
		if (!err) {
			res.render("./admin/clientconform")
		} else {
			console.log(err);
		}
	})
});

// view client
router.get("/:id", isloggedin, (req, res) => {
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
// router.get("/update/:id", (req, res) => {
// 	mysqlConnection.query("SELECT * FROM clients WHERE id=?", [req.params.id], (err, rows) => {
// 		if (!err) {
// 			res.render("./admin/clientupdate", { data: rows })
// 		}
// 		else {
// 			console.log(err)
// 		}
// 	})
// })

// router.post("/:id", upload.fields([
// 	{ name: "client_logo" },
// 	{ name: "client_poster" },
// ]), async (req, res) => {
// 	if (req.files["client_logo"] && req.files["client_poster"]) {
// 		mysqlConnection.query("UPDATE clients SET client_name=? , client_logo=? , client_poster=? WHERE id=?", [req.body.client_name, req.files["client_logo"][0].path, req.files["client_poster"][0].path, req.params.id], async (err, rows) => {
// 			if (!err) {
// 				await res.render("./admin/clientview", { data: rows })
// 			}
// 			else {
// 				console.log(err)
// 			}
// 		})
// 	} else if (req.files["client_logo"]) {
// 		mysqlConnection.query("UPDATE clients SET client_name=? , client_logo=? ,  WHERE id=?", [req.body.client_name, req.files["client_logo"][0].path, req.params.id], async (err, rows) => {
// 			if (!err) {
// 				await res.render("./admin/clientview", { data: rows })
// 			}
// 			else {
// 				console.log(err)
// 			}
// 		})
// 	}

// 	else if (req.files["client_poster"]) {
// 		mysqlConnection.query("UPDATE clients SET client_name=? , client_poster=? ,  WHERE id=?", [req.body.client_name, req.files["client_poster"][0].path, req.params.id], async (err, rows) => {
// 			if (!err) {
// 				await res.render("./admin/clientview", { data: rows })
// 			}
// 			else {
// 				console.log(err)
// 			}
// 		})
// 	}
// })



// delete client
router.get("/delete/:id", isloggedin, async (req, res) => {
	mysqlConnection.query("DELETE FROM clients WHERE id = ?", [req.params.id], async (err, rows) => {
		if (!err) {
			const url1 = req.query.client_logo.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
			const url2 = req.query.client_poster.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
			await cloudinary.uploader.destroy("BrabuPrintsMYSQL/" + url1);
			await cloudinary.uploader.destroy("BrabuPrintsMYSQL/" + url2);
			res.redirect("/admin/client")
		}
		else {
			console.log(err);
		}
	})
})


module.exports = router;