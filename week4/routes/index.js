var express = require("express");
var router = express.Router();

// global variable: used as database
var db = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  // res: http response
  res.render("index");
});

/* GET home page. */
router.get("/index", function (req, res, next) {
  // res: http response
  res.render("index");
});

module.exports = {
  db: db,
  router: router,
};
