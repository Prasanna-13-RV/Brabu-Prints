const mysql = require("mysql");
const db = require("../../database");
const { connect } = require("../routes/user");


exports.view = (req, res) => {

    connect.query("SELECT * FROM brabuprints", (err, rows) => {
        connect.release();

        if (err) {
            res.render("./admin/ourblog" , {rows})
        } else {
            console.log(err);
        }

        console.log("The data from user table: \n", rows);
    });
};
