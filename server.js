const express = require('express');
const mysql = require("mysql");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const multer = require("multer");
const { storage, cloudinary } = require("./cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const brabuprints = require("./routes/home");
const brabuprintsBlog = require("./routes/blog");
const brabuprintsClient = require("./routes/client");
const brabuprintsGallery = require("./routes/gallery");
const brabuprintsCarousel = require("./routes/carousel");
const brabuprintsProjectCarousel = require("./routes/projectcarousel");
const mysqlConnection = require("./database");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/" , brabuprints)
app.use("/admin/blog" , brabuprintsBlog)
app.use("/admin/client" , brabuprintsClient)
app.use("/admin/gallery" , brabuprintsGallery)
app.use("/admin/carousel" , brabuprintsCarousel)
app.use("/admin/projectcarousel" , brabuprintsProjectCarousel)

app.listen(8080, () => {
	console.log("SERVER IS RUNNING ON PORT 8080")
})
