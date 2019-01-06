const thumb = require("node-thumbnail").thumb;
const dirContent = "../qualityd/";
const dirContentThumbs = "../qualityd/thumbs/";
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const source_dir = path.join(__dirname, dirContent);
const dest_dir = path.join(__dirname, dirContentThumbs);

fs.readdir(source_dir, (err, files) => {
  files.forEach(file => {
    sharp(source_dir + file)
      .resize(100)
      .toFile(dest_dir + "thumb_" + file)
  });
});
