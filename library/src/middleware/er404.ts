import express, { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.status(404).render('errors/404', {
    title: 'Страница не найдена',
  });
};


export const errorLoggerMiddleware = (error: Error, req: express.Request, res: express.Response, next: () => void) => {

  // Log exception
  console.error(`
  ----------------------------------
  EXCEPTION MIDDLEWARE
  HTTP ${req.method} ${req.url}
  ${error.message}
  ${error.stack}
  ----------------------------------
  `);

  // Hide stack from client for security reasons
  const e = { error: "Internal server error" };
  res.status(500).json(e);

}