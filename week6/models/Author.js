const mongoose = require("mongoose");

let authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
  },
  birth: Date,
  address: {
    state: {
      type: String,
      validate: {
        validator: function (stateString) {
          return stateString.length >= 2 && stateString.length <= 3;
        },
        message:
          "The number of books written by that author must be in range 1-150",
      },
    },
    suburb: String,
    street: String,
    unit: String,
  },
  numBooks: {
    type: Number,
    min: 1,
    max: 150,
  },
});

module.exports = mongoose.model("Author", authorSchema);
