var express = require("express");
var router = express.Router();
const { Connection } = require("./connection");

router.get("/", function (req, res, next) {
  Connection.db
    .collection("week5table")
    .find({})
    .toArray(function (err, data) {
      // render the listbooks page with data(array)
      res.render("getbooks", { db: data });
    });
});

module.exports = router;
