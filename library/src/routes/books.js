const express = require('express');
const config = require('../config');
const file = require('../middleware/file');
const error404Custom = require('./error');
const _ = require('lodash')

const router = express.Router();

const Library = require('../Library');
const library = new Library();

const Comment = require('../model/Comment');

const COUNTER_URL = config.COUNTER_URL || 'http://counter:8888/counter'
const BOOKS_DIR = config.BOOKS_DIR || '/app'

router.get('/', async (req, res) => {
  const books = await library.getAll();
  const getView = books => {
    return Promise.all(books.map(async book => {
      const response = await fetch(`${COUNTER_URL}/${book.id}`);
      const view = await response.json();
      book.view = view.rep || 0;
      return book;
    }))
  }
  getView(books).then((result) => {
    res.render('books/index', {
      title: 'Список книг',
      library: result,
    });
  }).catch((err) => {
    error404Custom(err, req, res);
  });

});

const fileFields = file.fields([
  { name: 'fileBook', maxCount: 1 },
  { name: 'fileCover', maxCount: 1 },
]);

router.route('/create')
  .get((req, res) => {
    res.render('books/create', {
      title: 'Книга | добавление',
      book: {},
    });
  })
  .post(fileFields, async (req, res) => {
    const data = req.body;
    if (!_.isEmpty(req.files)) {
      const { fileBook, fileCover } = req.files;
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    try {
      await library.add(data)
      res.redirect('..');
    } catch (error) {
      error404Custom(error, req, res);
    }
  })

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await fetch(`${COUNTER_URL}/${id}/incr`, {
      method: "POST",
    });
    res.render('books/view', {
      title: 'Книга',
      book: await library.get(id),
      comments: await Comment.find({ bookId: id }).select('-__v')
    });
  } catch (error) {
    error404Custom(error, req, res);
  }
});

router.get('/:id/download/:fileType', async (req, res) => {
  const { id, fileType } = req.params;
  try {
    const book = await library.get(id);
    res.download(`${BOOKS_DIR}/${book[fileType]}`, book[fileType], (err) => {
      if (err) {
        error404Custom(err, req, res);
      }
    });
  } catch (error) {
    error404Custom(error, req, res);
  }
});

router.route('/update/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      res.render('books/update', {
        title: 'Книга | редактирование',
        book: await library.get(id),
      });
    } catch (error) {
      error404Custom(error, req, res);
    }
  })
  .post(fileFields, async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    if (!_.isEmpty(req.files)) {
      const { fileBook, fileCover } = req.files;
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    try {
      await library.update(id, data);
      res.redirect('/api/books/');
    } catch (error) {
      error404Custom(error, req, res);
    }
  });

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;

  try {
    library.remove(id);
    res.redirect('/api/books/');
  } catch (error) {
    error404Custom(error, req, res);
  }
});

module.exports = router;
