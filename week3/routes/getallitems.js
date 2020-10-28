var express = require("express");
var router = express.Router();
var db = require("./index").db;

function generateList(db) {
  let st = "id  name  count  cost  total(count*cost)</br>";
  for (let i = 0; i < db.length; i++) {
    st +=
      db[i].id +
      " | " +
      db[i].name +
      " | " +
      db[i].count +
      " | " +
      db[i].cost +
      " | " +
      db[i].count * db[i].cost +
      "</br>";
  }
  return st;
}

/* send item list */
// /getallitems
router.get("/", function (req, res, next) {
  res.send(generateList(db));
});

module.exports = router;
