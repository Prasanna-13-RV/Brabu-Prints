const mysql = require("mysql");
const express = require("express");
const path = require("path");
const router = express.Router({ mergeParams: true });
const methodOverride = require("method-override");
const session = require("express-session");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mysqlConnection = require("../database");

router.get("/register", function (req, res, next) {
	mysqlConnection.query("SELECT * FROM login", (err, rows, fields) => {
		if (!err) {
			res.render("./auth/register", { data: rows });
		} else {
			console.log(err);
		}
	});
});

router.post("/register", async (req, res) => {
	const { email, username, password } = req.body;
	if (!email || !password) {
		res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
	}

	const hash = await bcrypt.hash(password, 10);
	await mysqlConnection.query(
		"INSERT INTO login (email, username, hash) values(?,?,?)",
		[email, username, hash],
		(err, rows, response) => {
			if (!err) {
				res.redirect("/login");
			} else {
				console.log(err);
			}
		}
	);
});

router.get("/login", function (req, res, next) {
	mysqlConnection.query("SELECT * FROM login", (err, rows, fields) => {
		if (!err) {
			res.render("./auth/login", { data: rows });
		} else {
			console.log(err);
		}
	});
});


router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
		}
		mysqlConnection.query(
			`SELECT * FROM login where email = email`,
			async (err, rows, fields) => {
				if (!err) {
					const user = rows[0];
					const isMatch = await bcrypt.compare(password, rows[0].hash);
					if (!isMatch) {
						res.redirect("/login", { message: "Incorrect password" });
						res.status(400).json("Incorrect password");
					}
					if (req.session) {
						req.session.destroy((err) => {
							if (err) {
								console.log(err);
							} else {
								res.clearCookie('connect.sid')
								res.redirect("/admin/blog");
							}
						});
					}
				} else {
					console.log(err);
				}
			}
		);
	} catch (e) {
		console.log(e);
		res.status(400).json("Something broke!");
	}
});

module.exports = router;
