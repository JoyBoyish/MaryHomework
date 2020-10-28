// localhost:8080/removeItemid/value
var express = require("express");
var router = express.Router();
var db = require("./index").db;

/* GET home page. */
// get route parameters
router.get("/:removeId", function (req, res, next) {
  // get route parameters from the url
  let removeId = req.params.removeId;

  // remove item whose id = removeId
  for (var i = 0; i < db.length; i++) {
    var obj = db[i];
    if (obj.id == removeId) {
      db.splice(i, 1);
      break;
    }
  }
  res.render("index");
});

module.exports = router;
