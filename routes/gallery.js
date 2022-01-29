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
const { isloggedin } = require("../middleware");


router.get('/', isloggedin, function (req, res, next) {
    mysqlConnection.query("SELECT * FROM gallerys", (err, rows, fields) => {
        if (!err) {
            res.render("./admin/ourgallery", { data: rows })
        }
        else {
            console.log(err);
        }
    });
});

// create gallery
router.get("/create", isloggedin, (req, res) => {
    res.render("./admin/galleryCreate")
})
router.post("/create", isloggedin, upload.single("gallery_image"), (req, res) => {
    mysqlConnection.query("INSERT INTO gallerys (gallery_image) values(?)", [req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/galleryconform")
        } else {
            console.log(err);
        }
    })
});

// delete gallery
router.get("/delete/:id", isloggedin, async (req, res) => {
    mysqlConnection.query("DELETE FROM gallerys WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrint/")[1].slice(0, -4);
            await cloudinary.uploader.destroy("BrabuPrint/" + url);
            res.redirect("/admin/gallery")
        }
        else {
            console.log(err);
        }
    })
})





module.exports = router;
