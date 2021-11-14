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


router.get('/',isloggedin, function (req, res, next) {
    mysqlConnection.query("SELECT * FROM teams", (err, rows, fields) => {
        if (!err) {
            res.render("./admin/ourteam", { data: rows })
        }
        else {
            console.log(err);
        }
    });
});


// create team
router.get("/create",isloggedin, (req, res) => {
    res.render("./admin/teamCreate")
})
router.post("/create",isloggedin, upload.single("team_image"), (req, res) => {
    mysqlConnection.query("INSERT INTO teams (team_name, team_job, team_image) values(?,?,?)", [req.body.team_name, req.body.team_job, req.file.path], (err, rows, response) => {
        if (!err) {
            res.render("./admin/teamconform")
        } else {
            console.log(err);
        }
    })
});


// view team
router.get("/:id",isloggedin, (req, res) => {
    mysqlConnection.query("SELECT * FROM teams WHERE id = ?", [req.params.id], (err, row, fields) => {
        if (!err) {
            res.render("./admin/teamview", { data: row })
        }
        else {
            console.log(err)
        }
    })
});

// update team
// router.get("/update/:id", (req, res) => {
//     mysqlConnection.query("SELECT * FROM teams WHERE id=?" , [req.params.id], (err, rows) => {
//         if (!err) {
//             res.render("./admin/teamupdate", { data: rows })
//         }
//         else {
//             console.log(err)
//         }
//     })
// })

// router.post("/:id", (req, res) => {
//     mysqlConnection.query("UPDATE teams SET team_name=? , team_job=? WHERE id=?", [req.body.team_name, req.body.team_job, req.params.id], (err, rows) => {
//         if (!err) {
//             mysqlConnection.query("SELECT * FROM teams WHERE id = ?", [req.params.id], (err, rows) => {
//                 if (!err) {
//                     res.render("./admin/teamview", { data: rows })
//                 } else {
//                     console.log(err)
//                 }
//             })
//         }
//         else {
//             console.log(err)
//         }
//     })
// })



// delete team

router.get("/delete/:id",isloggedin, async (req, res) => {
    mysqlConnection.query("DELETE FROM teams WHERE id = ?", [req.params.id], async (err, rows) => {
        if (!err) {
            const url = req.query.cloudinaryName.split("BrabuPrintsMYSQL/")[1].slice(0,-4);
            await cloudinary.uploader.destroy("BrabuPrintsMYSQL/"+url);
            res.redirect("/admin/team")
        }
        else {
            console.log(err);
        }
        console.log(rows)
    })
})


module.exports = router;
