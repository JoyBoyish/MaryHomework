// localhost:8080/newItem/?name=value1& count=value2& cost=value3
var express = require("express");
var router = express.Router();
var db = require("./index").db;

/* GET home page. */

router.get("/", function (req, res, next) {
  console.log(req.query);

  // let exist = true;
  let newId = Math.round(Math.random() * 1000); // randomly generate id for the new item

  db.push({
    id: newId,
    name: req.query.name,
    count: req.query.count,
    cost: req.query.cost,
  });
  console.log("new item added.");

  res.render("index");
});

// export router to outside
module.exports = router;
