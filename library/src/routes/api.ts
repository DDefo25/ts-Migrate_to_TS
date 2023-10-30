import express, { Router } from 'express';
import booksRoute from './books';
import userRoute from './user';

const router: Router = express.Router();

router.use('/books', booksRoute);
router.use('/user', userRoute);

router.get('/', (_, res) => {
  res.render('index', {
    title: 'Главная',
  });
});

export default router;
