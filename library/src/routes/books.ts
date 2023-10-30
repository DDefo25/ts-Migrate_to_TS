import express, { Router } from 'express';
import { config } from '../config';
import file from '../middleware/file';
import _ from 'lodash'


import { container } from '../infrastructure/container';
import { TYPES } from '../db/types/types';
import { IRepository } from '../db/interfaces/Repository/Repository.interfaces';
import { IBook } from '../db/interfaces/Book/Book.interfaces';
import { IComment } from '../db/interfaces/Comment/Comment.interfaces';
import { errorHandler } from '../handlers/errorHandler';

const router: Router = express.Router();

const library = container.get<IRepository<IBook>>(TYPES.BooksRepository);
const commentsRepository = container.get<IRepository<IComment>>(TYPES.CommentsRepository)

const BOOKS_DIR = config.BOOKS_DIR || '/app'


router.get('/', async (req, res) => {
  const books = await library.getAll().catch(errorHandler);
  res.render('books/index', {
    title: 'Список книг',
    library: books,
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
      const { fileBook, fileCover } = req.files as { [fieldname: string]: Express.Multer.File[] };
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    await library.add(data).catch(errorHandler)
    res.redirect('..');
  })


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await library.get(id).catch(errorHandler);
  const comments = await commentsRepository.getAllByKey('bookId', id).catch(errorHandler);

  if (book) book.incViews()

  res.render('books/view', {
    title: 'Книга',
    book,
    comments
  });
});


router.get('/:id/download/:fileType', async (req, res) => {
  const { id, fileType } = req.params;
  const book: any = await library.get(id).catch(errorHandler);
  const fileName = book[fileType]; 
  res.download(`${BOOKS_DIR}/${fileName}`, fileName);
});


router.route('/update/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    
    res.render('books/update', {
        title: 'Книга | редактирование',
        book: await library.get(id).catch(errorHandler),
    });
  })
  
  .post(fileFields, async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    if (!_.isEmpty(req.files)) {
      const { fileBook, fileCover } = req.files as { [fieldname: string]: Express.Multer.File[] };
      data.fileBook = fileBook[0].path;
      data.fileName = fileBook[0].filename;
      data.fileCover = fileCover[0].path;
    }

    await library.update(id, data).catch(errorHandler)
    res.redirect('/api/books/');
  });

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;

  await library.remove(id).catch(errorHandler);
  res.redirect('/api/books/');
});

export default router;
