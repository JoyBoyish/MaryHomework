var express = require("express");
var router = express.Router();
var db = require("./index").db;

// function generateList(db) {
//   let st = "id  name  count  cost  total(count*cost)</br>";
//   for (let i = 0; i < db.length; i++) {
//     st +=
//       db[i].id +
//       " | " +
//       db[i].name +
//       " | " +
//       db[i].count +
//       " | " +
//       db[i].cost +
//       " | " +
//       db[i].count * db[i].cost +
//       "</br>";
//   }
//   return st;
// }

// /getallitems
router.get("/", function (req, res, next) {
  res.render("listEmployees", { db: db });
});

module.exports = router;
