const mongoose = require("mongoose");

const Actor = require("../models/actor");
const Movie = require("../models/movie");

module.exports = {
  getAllActors: function (req, res) {
    Actor.find({})
      .populate("movies")
      .exec(function (err, actors) {
        if (err) {
          return res.status(404).json(err);
        }
        res.json(actors);
      });
  },

  createOneActor: function (req, res) {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();

    let actor = new Actor(newActorDetails);
    actor.save(function (err) {
      res.json(actor);
    });
  },

  getOneActor: function (req, res) {
    Actor.findOne({ _id: req.params.id })
      .populate("movies")
      .exec(function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
      });
  },

  updateOneActor: function (req, res) {
    Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (
      err,
      actor
    ) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();

      res.json(actor);
    });
  },

  // delete actor and its corresponding movies
  deleteOneActor: function (req, res) {
    Actor.findOneAndRemove({ _id: req.params.id }, function (err, actor) {
      if (err) return res.status(400).json(err);

      actor.movies.forEach((movie_id) => {
        Movie.findByIdAndDelete(movie_id, function (err, doc) {
          if (err) return res.status(400).json(err);
        });
      });

      res.json(actor);
    });
  },

  addMovieToActor: function (req, res) {
    Actor.findOne({ _id: req.params.id }, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) {
        console.log("no such actor.");
        return res.status(404).json();
      }

      Movie.findOne({ _id: req.body.id }, function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) {
          console.log("no such movie.");
          return res.status(404).json();
        }

        // push movie id into the actor
        actor.movies.push(movie._id);
        actor.save(function (err) {
          if (err) return res.status(500).json(err);

          res.json(actor);
        });
      });
    });
  },

  removeMovieFromActor: function (req, res) {
    console.log("fuck you");
    console.log(req.params.actorid);
    console.log(req.params.movieid);

    Actor.updateOne(
      { _id: req.params.actorid },
      { $pull: { movies: req.params.movieid } },
      function (err, doc) {
        if (err) return res.status(400).json(err);
        console.log(doc);
        res.json(doc);
      }
    );
  },
};
