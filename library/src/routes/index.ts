import express, { Router } from 'express';
import apiRoute from './api';

const router: Router = express.Router();

router.use('/api', apiRoute);

router.get('/', (_, res) => {
  res.redirect('/api');
});

export default router;
