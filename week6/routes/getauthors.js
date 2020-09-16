var express = require("express");
var moment = require("moment");
var router = express.Router();
const Author = require("../models/Author");

router.get("/", function (req, res, next) {
  Author.find({}, function (err, data) {
    // deep copy data
    let new_data = JSON.parse(JSON.stringify(data));
    // replace data format
    for (let i = 0; i < new_data.length; i++) {
      new_data[i].birth = moment(new_data[i].birth).format("DD-MM-YYYY");
    }

    res.render("getauthors", { author_db: new_data });
  });
});

module.exports = router;
