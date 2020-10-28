var express = require("express");
var router = express.Router();

// global database
var db = [];
//First record is an object contains the three attributes
// var rec = {
//   id: "Tim",
//   name: 23,
//   count: "Mel",
//   cost: ""
// };
// db.push(rec);

/* GET home page. */
// post
router.get("/", function (req, res, next) {
  // res: http response
  res.render("index");
});

module.exports = {
  db: db,
  router: router,
};

// {
//   key:value,
// }
