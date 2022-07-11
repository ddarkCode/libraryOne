const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: String,
  genre: String,
  author: String,
  read: Boolean,
});
const Book = model('Book', bookSchema);

module.exports = Book;
