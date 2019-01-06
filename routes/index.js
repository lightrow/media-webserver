const express = require("express");
const router = express.Router();
const fs = require("fs");
const utf8 = require("utf8");

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.body.pass == "3965") {
    let list = [];
    let listVid = [];
    fs.readdir(process.env.FOLDER, (err, files) => {
      files.forEach(file => {
        let ext = file.slice(-3).toLowerCase();
        if (ext == "mp4") {
          listVid.push(utf8.encode(file));
        } else if (ext == "jpg" || ext == "png" || ext == "bmp") {
          list.push(utf8.encode(file));
        }
      });
      res.render("index", {
        title: "WebServer",
        list: list,
        listVid: listVid,
        width: process.env.RES
      });
    });
  } else {
    res.render("login");
  }
});

router.post("/", function(req, res, next) {
  console.log(req.body)
  if (req.body.pass == "3965") {
    console.log("yay")
    let list = [];
    let listVid = [];
    fs.readdir(process.env.FOLDER, (err, files) => {
      files.forEach(file => {
        let ext = file.slice(-3).toLowerCase();
        if (ext == "mp4") {
          listVid.push(utf8.encode(file));
        } else if (ext == "jpg" || ext == "png" || ext == "bmp") {
          list.push(utf8.encode(file));
        }
      });
      res.render("index", {
        title: "WebServer",
        list: list,
        listVid: listVid,
        width: process.env.RES
      });
    });
  } else {
    res.render("login");
  }
});

module.exports = router;
