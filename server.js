if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const multer = require('multer');
const morgan = require('morgan');
const { storage, cloudinary } = require('./cloudinary');
const upload = multer({ storage });
const brabuprints = require('./routes/home');
const brabuprintsBlog = require('./routes/blog');
const brabuprintsClient = require('./routes/client');
const brabuprintsGallery = require('./routes/gallery');
const brabuprintsCarousel = require('./routes/carousel');
const brabuprintsProjectCarousel = require('./routes/projectcarousel');
const brabuprintsWeekreport = require('./routes/teams');
const brabuprintsLogin = require('./routes/login');
const brabuprintsService = require('./routes/service');
const brabuprintsChatbot = require('./routes/chatbot');
const brabuprintsContact = require('./routes/contact');
const mysqlConnection = require('./database');
const compression = require('compression');

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// app.use(morgan('dev'));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const verifypassword = (req, res, next) => {
//   const { password } = req.query;
//   if (password === process.env.MYSECRET) {
//     next();
//   }
//   else {
//     res.redirect("/");
//   }
// }

app.use(methodOverride('_method'));

app.use('/', brabuprints);
app.use('/', brabuprintsContact);
app.use('/admin', brabuprintsLogin);
app.use('/admin/blog', brabuprintsBlog);
app.use('/admin/client', brabuprintsClient);
app.use('/admin/gallery', brabuprintsGallery);
app.use('/admin/carousel', brabuprintsCarousel);
app.use('/admin/projectcarousel', brabuprintsProjectCarousel);
app.use('/admin/weekreport', brabuprintsWeekreport);
app.use('/admin/service', brabuprintsService);
app.use('/', brabuprintsChatbot);

app.get('*', (req, res) => {
	res.render('404');
});

app.listen(process.env.PORT, () => {
	console.log('SERVER IS RUNNING ON PORT 8080');
});
