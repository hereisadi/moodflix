const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  searchs: [
    {
      textSerched: String,
      time: String,
      feelingResponse: String,
    },
  ],
});

const SearchModel = mongoose.model("Search", searchSchema);

module.exports = {
  SearchModel,
};
