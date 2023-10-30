import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
): void => {
    const filePath = path.join(`./books/${Date.now()}`);
    fs.mkdir(filePath, { recursive: true }, (err: unknown, path) => {
      if (err) throw err;
      else if (path) callback(null, path);
    })
  },
  filename: (
    req: Request, 
    file: Express.Multer.File, 
    callback: FileNameCallback
): void => {
    callback(null, file.originalname);
  },
});

export default multer({ storage });
