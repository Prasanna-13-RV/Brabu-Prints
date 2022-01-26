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
	mysqlConnection.query('SELECT * FROM services', (err, rows, fields) => {
		if (!err) {
			res.render('./admin/ourservice', { data: rows });
		} else {
			console.log(err);
		}
	});
});

// create service
router.get('/create', isloggedin, (req, res) => {
	res.render('./admin/serviceCreate');
});
router.post('/create', upload.single('image'), (req, res) => {
	mysqlConnection.query(
		'INSERT INTO services (service_title, image) values(?,?)',
		[req.body.service_title, req.file.path],
		(err, rows, response) => {
			if (!err) {
				res.render('./admin/serviceconform');
			} else {
				console.log(err);
			}
		}
	);
});

// view service
router.get('/:id', isloggedin, (req, res) => {
	mysqlConnection.query(
		'SELECT * FROM services WHERE id = ?',
		[req.params.id],
		(err, row, fields) => {
			if (!err) {
				res.render('./admin/serviceview', { data: row });
			} else {
				console.log(err);
			}
		}
	);
});

// update service
// router.get("/update/:id", isloggedin, (req, res) => {
//     mysqlConnection.query("SELECT * FROM services WHERE id=?", [req.params.id], (err, rows) => {
//         if (!err) {
//             res.render("./admin/serviceupdate", { data: rows })
//         }
//         else {
//             console.log(err)
//         }
//     })
// })

// router.post("/:id", isloggedin, (req, res) => {
//     mysqlConnection.query("UPDATE services SET service_title=?  WHERE id=?", [req.body.service_title, req.params.id], (err, rows) => {
//         if (!err) {
//             mysqlConnection.query("SELECT * FROM services WHERE id = ?", [req.params.id], (err, rows) => {
//                 if (!err) {
//                     res.render("./admin/serviceview", { data: rows })
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


// update service
router
	.route('/update/:id')
	.get(isloggedin, (req, res) => {
		mysqlConnection.query(
			'SELECT * FROM services WHERE id=?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
                    console.log(rows)
					res.render('./admin/serviceupdate', { data: rows });
				} else {
					console.log(err);
				}
			}
		);
	})

	.post(isloggedin, upload.single('image'), async (req, res) => {
        console.log(req.body);
		const oldImageName = req.body.oldImageURL
			.split('BrabuPrintsMYSQL/')[1]
			.slice(0, -4);
		console.log(req.body);
		await cloudinary.uploader.destroy(`BrabuPrintsMYSQL/${oldImageName}`);
		await mysqlConnection.query(
			'UPDATE services SET image = ?, service_title = ? WHERE id = ?',
			[
				req.file ? req.file.path : req.body.oldImageURL,
				req.body.service_title,
				req.params.id
			],
			(err, response) => {
				if (err) {
					req.flash('error', 'Error occurred while Updating');
					console.log(err);
					res.redirect('/admin/service');
					return;
				}
			}
		);
		console.log(oldImageName);
		req.flash('success', 'Images successfully updated');
		res.redirect('/admin/service');
	});

// router.post('/:id', isloggedin, upload.single('image'), async (req, res) => {
// 	const url = req.query.cloudinaryName
// 		.split('BrabuPrintsMYSQL/')[1]
// 		.slice(0, -4);
// 	await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
// 	mysqlConnection.query(
// 		'UPDATE services SET service_title=? , image=? WHERE id=?',
// 		[req.body.service_title, req.file.path, req.params.id],
// 		(err, rows) => {
// 			if (!err) {
// 				res.render('./admin/serviceview', { data: rows });
// 			} else {
// 				console.log(err);
// 			}
// 		}
// 	);
// });












// delete service
router.get('/delete/:id', isloggedin, async (req, res) => {
	mysqlConnection.query(
		'DELETE FROM services WHERE id = ?',
		[req.params.id],
		async (err, rows) => {
			if (!err) {
				const url = req.query.cloudinaryName
					.split('BrabuPrintsMYSQL/')[1]
					.slice(0, -4);
				await cloudinary.uploader.destroy('BrabuPrintsMYSQL/' + url);
				res.redirect('/admin/service');
			} else {
				console.log(err);
			}
		}
	);
});

module.exports = router;
