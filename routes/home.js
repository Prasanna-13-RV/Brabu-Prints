const express = require("express");
const path = require("path");
const router = express.Router();
const methodOverride = require("method-override");
const multer = require("multer");
const mysql = require("mysql");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mysqlConnection = require("../database");

router.get("/", async (req, res) => {
  await mysqlConnection.query(
    "SELECT * FROM clients",
    async (err, rows, fields) => {
      clientArray = [];
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i <= rows.length - 1; i++) {
          var clientImage = {
            client_logo: rows[i].client_logo,
          };
          clientArray.push(clientImage);
        }
        await mysqlConnection.query(
          "SELECT * FROM carousels",
          async (err, rows, fields) => {
            carouselArray = [];
            if (err) {
              console.log(err);
            } else {
              for (let i = 0; i <= rows.length - 1; i++) {
                var carouselImage = {
                  carousel_image: rows[i].carousel_image,
                };
                carouselArray.push(carouselImage);
              }
            }
            await mysqlConnection.query(
              "SELECT * FROM teams",
              async (err, rows, fields) => {
                teamArray = [];
                if (err) {
                  console.log(err);
                } else {
                  for (let i = 0; i <= rows.length - 1; i++) {
                    var teamImage = {
                      team_name: rows[i].team_name,
                      team_image: rows[i].team_image,
                      team_job: rows[i].team_job,
                    };
                    teamArray.push(teamImage);
                  }
                  await mysqlConnection.query("SELECT * FROM services", async (err, rows, fields) => {
                    if (err) {
                      console.log(err);
                    } else {
                      var serviceArray = [];
                      for (let i = 0; i <= rows.length - 1; i++) {
                        var serviceImage = {
                          service_title: rows[i].service_title,
                          image: rows[i].image,
                        };
                        serviceArray.push(serviceImage);
                      }
                    }
                    res.render("index", {
                      clientArray,
                      carouselArray,
                      teamArray,
                      serviceArray,
                    });
                  })
                }
              }
            );
          }
        );
      }
    }
  );
});

router.get("/gallery", (req, res) => {
  mysqlConnection.query("SELECT * FROM clients", (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      var clientArray = [];
      for (let i = 0; i <= rows.length - 1; i++) {
        var clientImage = {
          client_poster: rows[i].client_poster,
        };
        clientArray.push(clientImage);
      }
      mysqlConnection.query("SELECT * FROM gallerys", (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          var galleryArray = [];
          for (let i = 0; i <= rows.length - 1; i++) {
            var galleryImage = {
              gallery_image: rows[i].gallery_image,
            };
            galleryArray.push(galleryImage);
          }
          res.render("gallery", {
            clientArray,
            galleryArray,
            data: rows,
          });
        }
      });
    }
  });
});

router.get("/blog", (req, res) => {
  mysqlConnection.query("SELECT * FROM blogs", (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      var blogArray = [];
      for (let i = 0; i <= rows.length - 1; i++) {
        var blogImage = {
          blog_title: rows[i].blog_title,
          blog_content: rows[i].blog_content,
          image: rows[i].image,
        };
        blogArray.push(blogImage);
      }
      res.render("blogs", { blogArray });
    }
  });
});






router
  .route('/admin/chatbot')
  .get(async (req, res) => {
    await mysqlConnection.query('SELECT * FROM chatbot', (err, response) => {
      var arr = [];
      if (err) {
        console.log(err);
      } else {
        res.render('chatbot1', { chatbot: response });
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
