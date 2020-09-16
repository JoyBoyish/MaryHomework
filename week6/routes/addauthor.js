var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Author = require("../models/Author");

/* GET newEmployee page. */
router.get("/", function (req, res, next) {
  res.render("addauthor");
});

router.post("/", function (req, res, next) {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let birth = req.body.birth;
  let state = req.body.state;
  let suburb = req.body.suburb;
  let street = req.body.street;
  let unit = req.body.unit;
  let num_books = req.body.num_books;

  let author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: first_name,
      lastName: last_name,
    },
    birth: birth,
    address: {
      state: state,
      suburb: suburb,
      street: street,
      unit: unit,
    },
    numBooks: num_books,
  });

  author.save(function (err) {
    if (err) {
      // throw err;
      res.redirect("/addauthor");
    } else {
      // navigate to other url
      res.redirect("/getauthors");
    }
  });
});

// export router to outside
module.exports = router;
