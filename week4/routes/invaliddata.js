var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // res: http response
  res.render("invalidData");
});

module.exports = router;
