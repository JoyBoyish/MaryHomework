var express = require("express");
var router = express.Router();
const Book = require("../models/Book");

router.get("/", function (req, res, next) {
  res.render("deletebook");
});

router.post("/", function (req, res, next) {
  // delete from the database
  let ISBN = req.body.ISBN;
  let filter = { isbn: ISBN };

  Book.deleteOne(filter, function (err, doc) {
    if (err) {
      console.log(err);
      res.redirect("/deletebook");
    } else {
      console.log(doc);
      res.redirect("/getbooks");
    }
  });
});

module.exports = router;
