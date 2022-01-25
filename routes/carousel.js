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
    mysqlConnection.query("SELECT * FROM carousel", (err, rows, fields) => {
        if (!err) {
            res.render("./admin/ourcarousel", { data: rows })
        }
        else {
            console.log(err);
        }
    });
});

// create carousel
router.get("/create", isloggedin, (req, res) => {
    res.render("./admin/carouselCreate")
})
router.post("/create", isloggedin, upload.single("image"), (req, res) => {
    mysqlConnection.query("INSERT INTO carousel (title, sub_title, description, image) values(?,?,?,?)", [req.body.title, req.body.sub_title, req.body.description, req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/carouselconform")
        } else {
            console.log(err);
        }
    })
});

// update carousel
router.get("/update/:id", isloggedin, (req, res) => {
    mysqlConnection.query("SELECT * FROM carousel WHERE id=?", [req.params.id], (err, rows) => {
        if (!err) {
            res.render("./admin/carouselupdate", { data: rows })
        }
        else {
            console.log(err)
        }
    })
})

router.post("/:id", isloggedin, upload.single("image"), (req, res) => {
    mysqlConnection.query("UPDATE carousel SET title=? , sub_title=? , description=? , image=? WHERE id=?", [req.body.title, req.body.sub_title, req.body.description, req.file.path, req.params.id], (err, rows) => {
        if (!err) {
            mysqlConnection.query("SELECT * FROM carousel WHERE id = ?", [req.params.id], (err, rows) => {
                if (!err) {
                    res.render("./admin/carouselview", { data: rows })
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

// update client
// router.get("/update/:id", (req, res) => {
//     mysqlConnection.query("SELECT * FROM carousel WHERE id=?", [req.params.id], (err, rows) => {
//         if (!err) {
//             res.render("./admin/carouselupdate", { data: rows })
//         }
//         else {
//             console.log(err)
//         }
//     })
// })

// router.post("/:id", upload.fields([
//     { name: "image" },
// ]), async (req, res) => {
//     console.log(req.files)
//     if (req.files["client_logo"] && req.files["client_poster"]) {
//         mysqlConnection.query("UPDATE carousel SET client_name=? , client_logo=? , client_poster=? WHERE id=?", [req.body.client_name, req.files["client_logo"][0].path, req.files["client_poster"][0].path, req.params.id], async (err, rows) => {
//             if (!err) {
//                 await res.render("./admin/clientview", { data: rows })
//             }
//             else {
//                 console.log(err)
//             }
//         })
//     } else if (req.files["image"]) {
//         mysqlConnection.query("UPDATE carousel SET title=? , sub_title=? , description=? , image=? ,  WHERE id=?", [req.body.client_name, req.files["image"][0].path, req.params.id], async (err, rows) => {
//             if (!err) {
//                 await res.render("./admin/clientview", { data: rows })
//             }
//             else {
//                 console.log(err)
//             }
//         })
//     }
// })




// delete carousel
router.get("/delete/:id", isloggedin, async (req, res) => {
    mysqlConnection.query("DELETE FROM carousel WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
            await cloudinary.uploader.destroy("BrabuPrintsMYSQL/" + url);
            res.redirect("/admin/carousel")
        }
        else {
            console.log(err);
        }
    })
})


module.exports = router;
