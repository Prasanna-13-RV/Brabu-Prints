const mysql = require('mysql');
const express = require('express');
const path = require('path');
const router = express.Router();
const methodOverride = require('method-override');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const fs = require('fs');
const mysqlConnection = require('../database');
const { isloggedin } = require('../middleware');

router
	.route('/admin/chatbot')
	.get(async (req, res) => {
		await mysqlConnection.query('SELECT * FROM chatbot', (err, response) => {
			var arr = [];
			if (err) {
				console.log(err);
			} else {
				res.render('./admin/ourchatbot', { data: response });
			}
		});
	})
	.delete(async (req, res) => {
		await mysqlConnection.query('DELETE FROM chatbot', (err, response) => {
			if (err) {
				req.flash('error', 'Error occurred while deleting');
				console.log(err);
				res.redirect('/admin/chatbot');
			} else {
				req.flash('success', 'Successfully Deleted');
				res.redirect('/admin/chatbot');
			}
		});
	});

router.route('/chatbotdelete').post(async (req, res) => {
	await mysqlConnection.query(
		'DELETE FROM chatbot WHERE name = ? AND gmail = ?',
		[req.body.stuname, req.body.gmail],
		(err, response) => {
			if (err) {
				req.flash('error', 'Error occurred while deleting');
				console.log(err);
				res.redirect('/admin/chatbot');
			} else {
			}
		}
	);
});

router.get('/chatbot/:name/:email/:number', async (req, res) => {
	const date = new Date();
    console.log(req.params);
	await mysqlConnection.query(
		'INSERT INTO chatbot SET ?',
		{
			name: req.params.name,
			number: req.params.number,
			gmail: req.params.email,
			date:
				date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
		},
		(err, response) => {
			if (err) {
				console.log(err);
				return;
			} else {
			}
		}
	);
});

module.exports = router;
