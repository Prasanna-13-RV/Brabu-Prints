const mysql = require("mysql");
const express = require("express");
const path = require("path");
const router = express.Router({ mergeParams: true });
const methodOverride = require("method-override");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const mysqlConnection = require("../database");

router.get('/', function (req, res, next) {
	mysqlConnection.query("SELECT * FROM projectcarousels", (err, rows, fields) => {
		if (!err) {
			res.render("./admin/ourprojectcarousel", { data: rows })
		}
		else {
			console.log(err);
		}
	});
});

// create projectcarousel
router.get("/create", (req, res) => {
    res.render("./admin/projectcarouselCreate")
})
router.post("/create", upload.single("projectcarousel_image"), (req, res) => {
    mysqlConnection.query("INSERT INTO projectcarousels (projectcarousel_image) values(?)", [req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/projectcarouselconform")
        } else {
            console.log(err);
        }
    })
});

// delete projectcarousel
router.get("/delete/:id", async (req, res) => {
    mysqlConnection.query("DELETE FROM projectcarousels WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0,-4);
            await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url);
            res.redirect("/admin/projectcarousel")
        }
        else {
            console.log(err);
        }
        console.log(rows)
    })
})





module.exports = router;
