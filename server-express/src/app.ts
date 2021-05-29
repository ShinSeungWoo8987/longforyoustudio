import express, { Application, Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRouter from './routes/auth/auth';
import adminRouter from './routes/admin/admin';
import userRouter from './routes/user/user';
import fileUploadRouter from './routes/admin/fileUpload';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const app: Application = express();

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(new Date());
});

app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', fileUploadRouter);
app.use('/', authRouter);

app.listen(process.env.PORT!, () => {
  console.log(`Server Running on port ${process.env.PORT!}`);
});
