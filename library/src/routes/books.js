const express = require('express');
const Library = require('../Library');
const config = require('../config');
const file = require('../middleware/file');
const { error404Custom } = require('./error');

const router = express.Router();
const library = new Library();

const counterURL = config.COUNTER_URL || 'http://counter:8888/counter'
const bookDir = config.BOOKs_DIR || '/app'

router.get('/', async (req, res) => {
  const books = library.getAll();
  const getView = books => {
    return Promise.all(books.map(async book => {
      const response = await fetch(`${counterURL}/${book.id}`);
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
    error404Custom(err);
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
  .post(fileFields, (req, res) => {
    const data = req.body;
    if (req.files) {
      const { fileBook, fileCover } = req.files;
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    try {
      library.add(data)
      res.redirect('..');
    } catch (error) {
      error404Custom(error, req, res);
    }
  })

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await fetch(`${counterURL}/${id}/incr`, {
      method: "POST",
    });
    res.render('books/view', {
      title: 'Книга',
      book: library.get(id)
    });
  } catch (error) {
    error404Custom(error, req, res);
  }
});

router.get('/:id/download/:fileType', (req, res) => {
  const { id, fileType } = req.params;
  try {
    const book = library.get(id);
    res.download(`${bookDir}/${book[fileType]}`, book[fileType], (err) => {
      if (err) {
        error404Custom(err, req, res);
      }
    });
  } catch (error) {
    error404Custom(error, req, res);
  }
});

router.route('/update/:id')
  .get((req, res) => {
    const { id } = req.params;

    try {
      res.render('books/update', {
        title: 'Книга | редактирование',
        book: library.get(id),
      });
    } catch (error) {
      error404Custom(error, req, res);
    }
  })
  .post(fileFields, (req, res) => {
    const data = req.body;
    const { id } = req.params;

    if (req.files) {
      const { fileBook, fileCover } = req.files;
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    try {
      library.update(id, data);
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
