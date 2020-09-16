var express = require("express");
var router = express.Router();
const Author = require("../models/Author");
const { model } = require("../models/Author");

router.get("/", function (req, res, next) {
  let n = req.query.n;

  let query = { numBooks: { $lt: n } };
  Author.find(query, function (err, data) {
    console.log(data);
    res.send("thank you");
  });
});

module.exports = router;
