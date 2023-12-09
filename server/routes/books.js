const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: [String],
  text: String,
});

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
