var express = require("express");
var router = express.Router();
const { Connection } = require("./connection");

router.get("/", function (req, res, next) {
  res.render("deletebook");
});

router.post("/", function (req, res, next) {
  // delete from the database
  let ISBN = req.body.ISBN;
  let filter = { ISBN: ISBN };
  Connection.db.collection("week5table").deleteOne(filter);

  res.redirect("getbooks");
});

module.exports = router;
