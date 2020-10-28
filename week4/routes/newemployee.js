// localhost:8080/newItem/?name=value1& count=value2& cost=value3
var express = require("express");
var router = express.Router();
var db = require("./index").db;

/* GET newEmployee page. */
router.get("/", function (req, res, next) {
  res.render("newEmployee");
});

function validate(name, birth, department) {
  let current_year = new Date().getFullYear();
  let birth_year = new Date(birth).getFullYear();

  if (
    current_year - birth_year < 16 ||
    name.length < 3 ||
    department.length < 3
  ) {
    return false;
  } else {
    // submitted to the server
    return true;
  }
}

router.post("/", function (req, res, next) {
  console.log(req.body);

  // automatically + 1
  let id = db.length + 1;
  console.log(id);
  let name = req.body.name;
  console.log(name);

  let birth = req.body.birth;
  console.log(birth);

  let department = req.body.department;
  console.log(department);

  if (validate(name, birth, department)) {
    console.log("pass");
    db.push({
      id: id,
      name: name,
      birth: birth,
      department: department,
    });
    console.log("new employee added.");
    res.redirect("/listemployees");
  } else {
    console.log("not pass");
    // not a valid input
    res.redirect("/invaliddata");
  }
});

// export router to outside
module.exports = router;
