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
const nodemailer = require('nodemailer');


router.get('/', (req, res) => {
    res.render('./contact');
});

router.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        // host: 'www.brabuprint.com',
        // port: 587,
        // secure: false,
        service: 'gmail',
        auth: {
            user: 'prasannavelmurugan0200@gmail.com',
            pass: 'pRASANNA$#0200'
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });

    let mailOptions = {
        from: '"Nodemailer Contact" <prasannavelmurugan0200@gmail.com>',
        to: 'prasannavelmuruganrv.0200@gmail.com',
        subject: 'Node Contact Request',
        text: 'Hello world?',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.render('./contact', { msg: 'Email has been sent' });
    });
});



module.exports = router;