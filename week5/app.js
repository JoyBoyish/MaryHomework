// require third module
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

// require routers
var indexRouter = require("./routes/index");
var addBookRouter = require("./routes/addbook");
var deleteBookRouter = require("./routes/deletebook");
var updateBookRouter = require("./routes/updatebook");
var getBookRouter = require("./routes/getbooks");

// connect to the database for permanent use
const { Connection } = require("./routes/connection");
Connection.connectToMongo();

var app = express();

// view engine setup
app.engine("ejs", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// bind middleware with path which match the prefix
app.use("/", indexRouter);
app.use("/addbook", addBookRouter);
app.use("/deletebook", deleteBookRouter);
app.use("/updatebook", updateBookRouter);
app.use("/getbooks", getBookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
