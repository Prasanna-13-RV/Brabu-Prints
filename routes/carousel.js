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
	mysqlConnection.query("SELECT * FROM carousels", (err, rows, fields) => {
		if (!err) {
			res.render("./admin/ourcarousel", { data: rows })
		}
		else {
			console.log(err);
		}
	});
});

// create carousel
router.get("/create", (req, res) => {
    res.render("./admin/carouselCreate")
})
router.post("/create", upload.single("carousel_image"), (req, res) => {
    mysqlConnection.query("INSERT INTO carousels (carousel_image) values(?)", [req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/carouselconform")
        } else {
            console.log(err);
        }
    })
});

// delete carousel
router.get("/delete/:id", async (req, res) => {
    mysqlConnection.query("DELETE FROM carousels WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0,-4);
            await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url);
            res.redirect("/admin/carousel")
        }
        else {
            console.log(err);
        }
        console.log(rows)
    })
})





module.exports = router;
