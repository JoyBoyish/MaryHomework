var express = require("express");
var router = express.Router();
var randomstring = require("randomstring");
var mongoose = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

/* GET newEmployee page. */
router.get("/", function (req, res, next) {
  // random ISBN
  let ISBN = randomstring.generate({
    length: 13,
    charset: "numeric",
  });

  console.log(ISBN);
  res.render("addbook", { ISBN: ISBN });
});

router.post("/", function (req, res, next) {
  let title = req.body.title;
  let author_id = req.body.author_id;
  let ISBN = req.body.ISBN;
  let pub_date = req.body.pub_date;
  let summary = req.body.summary;

  let book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    author: author_id,
    isbn: ISBN,
    pub: pub_date,
    summary: summary,
  });

  // save new book
  book.save(function (err) {
    if (err) {
      res.redirect("/addbook");
    } else {
      let filter = { _id: author_id };
      let theUpdate = {
        $inc: {
          numBooks: 1,
        },
      };
      // update author
      Author.updateOne(filter, theUpdate, function (err, doc) {
        if (err) {
          console.log(err);
          // throw err;
          res.redirect("/addbook");
        } else {
          console.log(doc);
          res.redirect("/getbooks");
        }
      });
    }
  });
});

// export router to outside
module.exports = router;
