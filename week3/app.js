/* modules */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* routers */
var indexRouter = require("./routes/index").router;
var newItemRouter = require("./routes/newItem");
var getAllItemsRouter = require("./routes/getallitems");
var removeItemIdRouter = require("./routes/removeitemid");
var getWareHouseValueRouter = require("./routes/getwarehousevalue");

var app = express();

// view engine setup
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// load environment variables
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* bind middleware */
app.use("/", indexRouter); // localhost:8080/
app.use("/newItem", newItemRouter); //localhost:8080/newItem
app.use("/getallitems", getAllItemsRouter); //
app.use("/removeitemid", removeItemIdRouter);
app.use("/getwarehousevalue", getWareHouseValueRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //localhost:8080/YInqiaowang
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

module.exports = app; // export iterface
