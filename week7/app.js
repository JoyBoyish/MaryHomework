//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const movie = require("./models/movie");

const actors = require("./routers/actor");
const movies = require("./routers/movie");

const app = express();

app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/fi2095tabe", function (err) {
  if (err) {
    return console.log("Mongoose - connection error:", err);
  }
  console.log("Connect Successfully");
});

/*Configuring Endpoints*/

//Actor RESTFul endpoionts
app.get("/actors", actors.getAllActors); // get all actors
app.post("/actors", actors.createOneActor); // create one actor

app.get("/actors/:id", actors.getOneActor); // get specified actor
app.put("/actors/:id", actors.updateOneActor); // update specified actor
app.delete("/actors/:id", actors.deleteOneActor); // delete one actor

app.put("/actors/:actorid/:movieid", actors.removeMovieFromActor); // delete an actor from the list of authors in a movie

//Movie RESTFul  endpoints
app.get("/movies", movies.getAllMovies); // get all movies
app.delete("/movies", movies.deleteMoviesInRange); // delete movies which is produced in a range of year
app.post("/movies", movies.createOneMovie); // create one movie

app.get("/movies/:id", movies.getOneMovie); // get specifed movie
app.put("/movies/:id", movies.updateOneMovie); // update specified movie
app.delete("/movies/:id", movies.deleteOneMovie); // delete speicified movie

app.get("/movies/:year1/:year2", movies.getAllMoviesInRange);

app.put("/movies/:movieid/:actorid", movies.addActorToMovie);
app.put("/movies/actors/:movieid/:actorid", movies.removeActorFromMovie); // delete an actor from the list of authors in a movie
