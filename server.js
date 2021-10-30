const express = require('express');
const mysql = require("mysql");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
// const multer = require("multer");
// const { storage, cloudinary } = require("./cloudinary");
// const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const mysqlConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	multipleStatements: true
})

mysqlConnection.connect((err) => {
	if (!err) {
		console.log("MySQL is connected")
	}
	else {
		console.log("MySQL failed to connect")
		console.log(err)
	}
});

app.get("/", (req, res) => {
	res.render("index")
})
app.get("/gallery", (req, res) => {
	res.render("gallery")
})
app.get("/blog", (req, res) => {
	res.render("blogs")
})


app.get('/admin/blog', function (req, res, next) {
	mysqlConnection.query("SELECT * FROM blogs", (err, rows, fields) => {
		if (!err) {
			res.render("./admin/ourblog", { data: rows })
		}
		else {
			console.log(err);
		}
	});
});


// create blog
app.get("/admin/blog/create", (req, res) => {
	res.render("./admin/blogCreate")
})
app.post("/admin/blog/create", (req, res) => {
	mysqlConnection.query("INSERT INTO blogs (blog_title, blog_content, image) values(?,?,?)", [req.body.blog_title, req.body.blog_content, req.body.image], (err, rows, response) => {
		if (!err) {
			res.render("./admin/blogconform")
		} else {
			console.log(err);
		}
	})
});


// view blog
app.get("/admin/blog/:id", (req, res) => {
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
// app.get("/admin/blog/update/:id", (req, res) => {
// 	mysqlConnection.query("SELECT * FROM blogs", (err, rows, fields) => {
// 		if (!err) {
// 			res.render("./admin/blogupdate", { data: rows })
// 		}
// 		else {
// 			console.log(err);
// 		}
// 	});
// })
// app.put("/admin/blog/update/:id", (req, res) => {
// 	mysqlConnection.query("UPDATE blogs SET blog_title=? , blog_content=? WHERE id=?", [req.body.blog_title, req.body.blog_content, req.params.id], (err, row, fields) => {
// 		if (!err) {
// 			res.send("Succesfully updated", { data: row })
// 		}
// 		else {
// 			console.log(err);
// 		}
// 	})
// })

app.get("/admin/blog/update/:id", (req, res) => {
	mysqlConnection.query("SELECT * FROM blogs", (err, rows) => {
		if (!err) {
			res.render("./admin/blogupdate", { data: rows })
		}
		else {
			console.log(err)
		}
	})
})
app.post("/admin/blog/:id", (req, res) => {
	mysqlConnection.query("UPDATE blogs SET blog_title=? , blog_content=? WHERE id=?", [req.body.blog_title, req.body.blog_content, req.params.id], (err, rows) => {
		if (!err) {
			mysqlConnection.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, rows) => {
				if (!err) {
					res.render("./admin/blogview" , {data : rows})
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
app.get("/admin/blog/delete/:id", (req, res) => {
	mysqlConnection.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err, rows) => {
		if (!err) {
			res.redirect("/admin/blog")
		}
		else {
			console.log(err);
		}
		console.log(rows)
	})
})





app.listen(8080, () => {
	console.log("SERVER IS RUNNING ON PORT 8080")
})
