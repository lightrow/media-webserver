var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log(req.query.v);
  res.render("player", { link: req.query.v });
});

module.exports = router;
