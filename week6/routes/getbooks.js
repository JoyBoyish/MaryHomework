var express = require("express");
var router = express.Router();
var moment = require("moment");
const Book = require("../models/Book");

router.get("/", function (req, res, next) {
  Book.find({})
    .populate("author")
    .exec(function (err, data) {
      console.log(data);

      let new_data = JSON.parse(JSON.stringify(data));
      // replace data format
      for (let i = 0; i < new_data.length; i++) {
        new_data[i].pub = moment(new_data[i].pub).format("DD-MM-YYYY");
      }
      res.render("getbooks", { book_db: new_data });
    });
});

module.exports = router;
