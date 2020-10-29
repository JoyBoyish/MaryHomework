var express = require("express");
var router = express.Router();
const { Connection } = require("./connection");

// I don't know why...
// Connection.connectToMongo();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
