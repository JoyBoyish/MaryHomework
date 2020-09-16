var express = require("express");
var router = express.Router();
const Author = require("../models/Author");

router.get("/", function (req, res, next) {
  res.render("updateauthor");
});

router.post("/", function (req, res, next) {
  let author_id = req.body.author_id;
  let num_books = req.body.num_books;
  console.log(num_books);

  let filter = { _id: author_id };
  let theUpdate = {
    $set: {
      numBooks: num_books,
    },
  };
  let options = {
    runValidators: true,
  };
  Author.updateOne(filter, theUpdate, options, function (err, doc) {
    if (err) {
      res.redirect("/updateauthor");
    } else {
      console.log(doc);
      res.redirect("/getauthors");
    }
  });
});

module.exports = router;
