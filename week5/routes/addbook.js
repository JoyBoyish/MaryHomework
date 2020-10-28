var express = require("express");
var router = express.Router();
var randomstring = require("randomstring");
const { Connection } = require("./connection");

/* GET newEmployee page. */
router.get("/", function (req, res, next) {
  // random ISBN
  let ISBN = randomstring.generate({
    length: 13,
    charset: "numeric",
  });

  console.log(ISBN);
  res.render("addbook", { ISBN: ISBN });
});

// function validate(name, birth, department) {
//   let current_year = new Date().getFullYear();
//   let birth_year = new Date(birth).getFullYear();

//   if (
//     current_year - birth_year < 16 ||
//     name.length < 3 ||
//     department.length < 3
//   ) {
//     return false;
//   } else {
//     // submitted to the server
//     return true;
//   }
// }

router.post("/", function (req, res, next) {
  let title = req.body.title;
  let author = req.body.author;
  let ISBN = req.body.ISBN;
  let date = req.body.date;
  let summary = req.body.summary;

  console.log(req.body);

  // db.push({
  //   id: id,
  //   name: name,
  //   birth: birth,
  //   department: department,
  // });
  Connection.db.collection("week5table").insertOne({
    title: title,
    author: author,
    ISBN: ISBN,
    date: date,
    summary: summary,
  });

  // navigate to other url
  res.redirect("/getbooks");
});

// export router to outside
module.exports = router;
