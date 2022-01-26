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

router.get('/', isloggedin, function (req, res, next) {
	mysqlConnection.query('SELECT * FROM weekreport', (err, rows, fields) => {
		if (!err) {
			res.render('./admin/ourteam', { data: rows });
		} else {
			console.log(err);
		}
	});
});

// create team
router.get('/create', isloggedin, (req, res) => {
	res.render('./admin/teamCreate');
});
router.post(
	'/create',
	isloggedin,
	upload.single('weekly_report_image'),
	(req, res) => {
		mysqlConnection.query(
			'INSERT INTO weekreport (weekly_report_para, weekly_report_image) values(?,?)',
			[req.body.weekly_report_para, req.file.path],
			(err, rows, response) => {
				if (!err) {
					res.render('./admin/teamconform');
				} else {
					console.log(err);
				}
			}
		);
	}
);

// view team
router.get('/:id', isloggedin, (req, res) => {
	mysqlConnection.query(
		'SELECT * FROM weekreport WHERE id = ?',
		[req.params.id],
		(err, row, fields) => {
			if (!err) {
				res.render('./admin/teamview', { data: row });
			} else {
				console.log(err);
			}
		}
	);
});

// update Weekly Report
router
	.route('/update/:id')
	.get(isloggedin, (req, res) => {
		mysqlConnection.query(
			'SELECT * FROM weekreport WHERE id=?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.render('./admin/teamupdate', { data: rows });
				} else {
					console.log(err);
				}
			}
		);
	})

	.post(isloggedin, upload.single('weekly_report_image'), async (req, res) => {
		const oldImageName = req.body.oldImageURL
			.split('BrabuPrintsMYSQL/')[1]
			.slice(0, -4);
		await cloudinary.uploader.destroy(`BrabuPrintsMYSQL/${oldImageName}`);
		await mysqlConnection.query(
			'UPDATE weekreport SET weekly_report_image = ?, weekly_report_para = ? WHERE id = ?',
			[
				req.file ? req.file.path : req.body.oldImageURL,
				req.body.weekly_report_para,
				req.params.id
			],
			(err, response) => {
				if (err) {
					req.flash('error', 'Error occurred while Updating');
					console.log(err);
					return res.redirect('/admin/weekreport');
				}
			}
		);
		req.flash('success', 'Images successfully updated');
		res.redirect('/admin/weekreport');
	});

router.post(
	'/:id',
	isloggedin,
	upload.single('weekly_report_image'),
	async (req, res) => {
		const url = req.query.cloudinaryName
			.split('BrabuPrintsMYSQL/')[1]
			.slice(0, -4);
		await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
		mysqlConnection.query(
			'UPDATE weekreport SET weekly_report_para=? , weekly_report_image=? WHERE id=?',
			[req.body.weekly_report_image, req.file.path, req.params.id],
			(err, rows) => {
				if (!err) {
					res.render('./admin/teamview', { data: rows });
				} else {
					console.log(err);
				}
			}
		);
	}
);

// delete team

router.get('/delete/:id', isloggedin, async (req, res) => {
	mysqlConnection.query(
		'DELETE FROM weekreport WHERE id = ?',
		[req.params.id],
		async (err, rows) => {
			if (!err) {
				const url = req.query.cloudinaryName
					.split('BrabuPrintsMYSQL/')[1]
					.slice(0, -4);
				await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
				res.redirect('/admin/weekreport');
			} else {
				console.log(err);
			}
		}
	);
});

module.exports = router;
