var Actor = require("../models/actor");
var Movie = require("../models/movie");
const mongoose = require("mongoose");

module.exports = {
  getAllMovies: function (req, res) {
    Movie.find({})
      .populate("actors")
      .exec(function (err, movies) {
        if (err) {
          return res.status(400).json(err);
        }
        res.json(movies);
      });
  },

  getAllMoviesInRange: function (req, res) {
    Movie.find(
      { year: { $lte: req.params.year1, $gte: req.params.year2 } },
      function (err, movies) {
        if (err) return res.status(400).json(err);

        res.json(movies);
      }
    );
  },

  createOneMovie: function (req, res) {
    let newMovieDetails = req.body;
    newMovieDetails._id = new mongoose.Types.ObjectId();
    Movie.create(newMovieDetails, function (err, movie) {
      if (err) return res.status(400).json(err);

      res.json(movie);
    });
  },

  getOneMovie: function (req, res) {
    Movie.findOne({ _id: req.params.id })
      .populate("actors")
      .exec(function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        res.json(movie);
      });
  },

  updateOneMovie: function (req, res) {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (
      err,
      movie
    ) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.json(movie);
    });
  },

  deleteOneMovie: function (req, res) {
    Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);

      res.json();
    });
  },

  deleteMoviesInRange: function (req, res) {
    Movie.deleteMany(
      { year: { $lte: req.body.year1, $gte: req.body.year2 } },
      function (err, doc) {
        if (err) {
          return res.status(400).json(err);
        }
        res.json(doc);
      }
    );
  },

    // delete movies before a year
    deleteMoviesBefore: function (req, res) {
      Movie.deleteMany(
        { year: { $lt: req.body.year} },
        function (err, doc) {
          if (err) {
            return res.status(400).json(err);
          }
          res.json(doc);
        }
      );
    },

  addActorToMovie: function (req, res) {
    Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) {
        console.log("no such movie.");
        return res.status(404).json();
      }

      Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) {
          console.log("no such actor.");
          return res.status(404).json();
        }

        // push actor id into the movie
        movie.actors.push(actor._id);
        movie.save(function (err) {
          if (err) return res.status(500).json(err);

          res.json(movie);
        });
      });
    });
  },

  removeActorFromMovie: function (req, res) {
    Movie.updateOne(
      { _id: req.params.movieid },
      { $pull: { actors: req.params.actorid } },
      function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) {
          console.log("no such movie.");
          return res.status(404).json();
        }
        res.json(movie);
      }
    );
  },
};
