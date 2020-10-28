var express = require("express");
var router = express.Router();
const { Connection } = require("./connection");

router.get("/", function (req, res, next) {
  res.render("updatebook");
});

router.post("/", function (req, res, next) {
  let ISBN = req.body.ISBN; //jjjjjjjjj
  let title = req.body.title;
  let author = req.body.author;
  let date = req.body.date;
  let summary = req.body.summary;

  let filter = { ISBN: ISBN };
  let theUpdate = {
    $set: {
      title: title,
      author: author,
      date: date,
      summary: summary,
    },
  };
  Connection.db.collection("week5table").updateOne(filter, theUpdate);
  res.redirect("/getbooks");
});

module.exports = router;
