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
              "SELECT * FROM weekreport",
              async (err, rows, fields) => {
                teamArray = [];
                if (err) {
                  console.log(err);
                } else {
                  for (let i = 0; i <= rows.length - 1; i++) {
                    var teamImage = {
                      weekly_report_para: rows[i].weekly_report_para,
                      weekly_report_image: rows[i].weekly_report_image,
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
                    await mysqlConnection.query("SELECT * FROM carousel", async (err, rows, fields) => {
                      if (err) {
                        console.log(err);
                      } else {
                        var carouselArray = [];
                        for (let i = 0; i <= rows.length - 1; i++) {
                          var carouselImage = {
                            title: rows[i].title,
                            sub_title: rows[i].sub_title,
                            description: rows[i].description,
                            image: rows[i].image,
                          };
                          carouselArray.push(carouselImage);
                        }
                      }
                      res.render("index", {
                        clientArray,
                        carouselArray,
                        teamArray,
                        serviceArray,
                        carouselArray,
                      });
                    })
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
router.get("/service", async(req, res) => {
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
      res.render("service", { serviceArray });
    }
  });
});


module.exports = router;
