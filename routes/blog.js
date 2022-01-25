const mysql = require('mysql');
const express = require('express');
const path = require('path');
const router = express.Router({ mergeParams: true });
const methodOverride = require('method-override');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const mysqlConnection = require('../database');
const { isloggedin } = require('../middleware');

router.route('/').get(isloggedin, function (req, res, next) {
	mysqlConnection.query('SELECT * FROM blogs', (err, rows, fields) => {
		if (!err) {
			res.render('./admin/ourblog', { data: rows });
		} else {
			console.log(err);
		}
	});
});

// create blog
router.get('/create', isloggedin, (req, res) => {
	res.render('./admin/blogCreate');
});
router.post('/create', upload.single('image'), (req, res) => {
	mysqlConnection.query(
		'INSERT INTO blogs (blog_title, blog_content, image) values(?,?,?)',
		[req.body.blog_title, req.body.blog_content, req.file.path],
		(err, rows, response) => {
			if (!err) {
				res.render('./admin/blogconform');
			} else {
				console.log(err);
			}
		}
	);
});

// view blog
router.get('/:id', isloggedin, (req, res) => {
	mysqlConnection.query(
		'SELECT * FROM blogs WHERE id = ?',
		[req.params.id],
		(err, row, fields) => {
			if (!err) {
				res.render('./admin/blogview', { data: row });
			} else {
				console.log(err);
			}
		}
	);
});

// update blog
router
	.route('/update/:id')
	.get(isloggedin, (req, res) => {
		mysqlConnection.query(
			'SELECT * FROM blogs WHERE id=?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.render('./admin/blogupdate', { data: rows });
				} else {
					console.log(err);
				}
			}
		);
	})

	.post(isloggedin, upload.single('image'), async (req, res) => {
		const oldImageName = req.body.oldImageURL
			.split('BrabuPrintsMYSQL/')[1]
			.slice(0, -4);
		console.log(req.body);
		await cloudinary.uploader.destroy(`BrabuPrintsMYSQL/${oldImageName}`);
		await mysqlConnection.query(
			'UPDATE blogs SET image = ?, blog_title = ?,  blog_content = ? WHERE id = ?',
			[
				req.file ? req.file.path : req.body.oldImageURL,
				req.body.blog_title,
				req.body.blog_content,
				req.params.id
			],
			(err, response) => {
				if (err) {
					req.flash('error', 'Error occurred while Updating');
					console.log(err);
					res.redirect('/admin/blog');
					return;
				}
			}
		);
		console.log(oldImageName);
		req.flash('success', 'Images successfully updated');
		res.redirect('/admin/blog');
	});

// router.post('/:id', isloggedin, upload.single('image'), async (req, res) => {
// 	const url = req.query.cloudinaryName
// 		.split('BrabuPrintsMYSQL/')[1]
// 		.slice(0, -4);
// 	await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
// 	mysqlConnection.query(
// 		'UPDATE blogs SET blog_title=? , blog_content=? , image=? WHERE id=?',
// 		[req.body.blog_title, req.body.blog_content, req.file.path, req.params.id],
// 		(err, rows) => {
// 			if (!err) {
// 				res.render('./admin/blogview', { data: rows });
// 			} else {
// 				console.log(err);
// 			}
// 		}
// 	);
// });


// delete blog
router.get('/delete/:id', isloggedin, async (req, res) => {
	mysqlConnection.query(
		'DELETE FROM blogs WHERE id = ?',
		[req.params.id],
		async (err, rows) => {
			if (!err) {
				const url = req.query.cloudinaryName
					.split('BrabuPrintsMYSQL/')[1]
					.slice(0, -4);
				await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
				res.redirect('/admin/blog');
			} else {
				console.log(err);
			}
		}
	);
});

module.exports = router;
