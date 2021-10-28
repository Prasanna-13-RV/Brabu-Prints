const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./database");

db.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Mysql Database connected");
	}
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyPaser.json());

app.get("/", (req,res) => {
	res.render("index");
});
app.get("/gallery", (req,res) => {
	res.render("gallery");
});
app.get("/blogs", (req,res) => {
	res.render("blogs");
});



app.listen(8080, () =>
	console.log(`SERVER IS RUNNING ON PORT 8080`)
);