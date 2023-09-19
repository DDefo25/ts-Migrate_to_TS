const { v4: uuid } = require('uuid');
const Book = require('./model/Book')

class Library {
  constructor() {
    this.id = uuid();
    this.buffer = [];
  }

  async add(data) {
    const newBook = new Book(data);
    try {
      await newBook.save()
      return newBook;
    } catch (e) {
      return e;
    }
  }

  async get(id) {
    try {
      const book = await Book.findById(id).select('-__v');
      return book;
    } catch (e) {
      return e;
    }
  }

  async getAll() {
    try {
      const books = await Book.find().select('-__v');
      return books;
    } catch (e) {
      return e;
    }
  }

  async update(id, params) {
    try {
      await Book.findByIdAndUpdate(id, params)
      return book;
    } catch (e) {
      return e;
    }
  }

  async remove(id) {
    try {
      await Book.deleteOne({_id: id})
      return book;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Library;
