import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/login', (req, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

export default router;
