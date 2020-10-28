var express = require("express");
var router = express.Router();
var db = require("./index").db;

/* send the total warehouse value. */
router.get("/", function (req, res, next) {
  // res.render("index");
  let sum = 0;
  for (let i = 0; i < db.length; i++) {
    sum += db[i].count * db[i].cost;
  }
  // 9999 7777
  // res.send(sum); // ERROR
  res.send(sum + "<br>");
});

module.exports = router;
