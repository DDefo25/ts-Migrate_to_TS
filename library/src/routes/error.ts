import { Request, Response } from 'express'

export const error404Custom = (err: any, req: Request, res: Response) => {
  res.status(404).render('../views/errors/404', {
    title: err.message,
  });
};
