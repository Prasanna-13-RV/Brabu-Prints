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
                  res.render("index", {
                    clientArray,
                    carouselArray,
                    teamArray,
                  });
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
module.exports = router;
