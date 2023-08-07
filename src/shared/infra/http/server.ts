import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      code: err.code,
    });
  }

  console.error(err);

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
    code: AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
