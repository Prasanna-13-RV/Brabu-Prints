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
const {isloggedin} = require("../middleware");


router.route('/').get(isloggedin, function (req, res, next) {
    mysqlConnection.query("SELECT * FROM blogs", (err, rows, fields) => {
        if (!err) {
            console.log(req.session.loginuser);
            res.render("./admin/ourblog", { data: rows })
        }
        else {
            console.log(err);
        }
    });
});


// create blog
router.get("/create",isloggedin, (req, res) => {
    res.render("./admin/blogCreate")
})
router.post("/create", upload.single("image"), (req, res) => {
    mysqlConnection.query("INSERT INTO blogs (blog_title, blog_content, image) values(?,?,?)", [req.body.blog_title, req.body.blog_content, req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/blogconform")
        } else {
            console.log(err);
        }
    })
});


// view blog
router.get("/:id",isloggedin, (req, res) => {
    mysqlConnection.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, row, fields) => {
        if (!err) {
            res.render("./admin/blogview", { data: row })
        }
        else {
            console.log(err)
        }
    })
});

// update blog
router.get("/update/:id",isloggedin, (req, res) => {
    mysqlConnection.query("SELECT * FROM blogs WHERE id=?" , [req.params.id], (err, rows) => {
        if (!err) {
            res.render("./admin/blogupdate", { data: rows })
        }
        else {
            console.log(err)
        }
    })
})

router.post("/:id",isloggedin, (req, res) => {
    mysqlConnection.query("UPDATE blogs SET blog_title=? , blog_content=? WHERE id=?", [req.body.blog_title, req.body.blog_content, req.params.id], (err, rows) => {
        if (!err) {
            mysqlConnection.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, rows) => {
                if (!err) {
                    res.render("./admin/blogview", { data: rows })
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



// delete blog
router.get("/delete/:id",isloggedin, async (req, res) => {
    mysqlConnection.query("DELETE FROM blogs WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0, -4);
            await cloudinary.uploader.destroy("BrabuPrintsMYSQL/" + url);
            res.redirect("/admin/blog")
        }
        else {
            console.log(err);
        }
        console.log(rows)
    })
})


module.exports = router;
