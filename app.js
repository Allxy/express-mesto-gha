import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import errorLog from './middlewares/ErrorLog.js';
import defaultErrorHandler from './middlewares/DefaultErrorHandler.js';
import httpErrorHandler from './middlewares/HttpErrorHandler.js';
import mongoErrorHandler from './middlewares/MongoErrorHandler.js';
import authErrorHandler from './middlewares/AuthErrorHandler.js';
import router from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.info('Success connection to database.');

    const app = express();
    app.use(json());
    app.use('/', router);
    app.use(errorLog);
    app.use(errors());
    app.use(authErrorHandler);
    app.use(httpErrorHandler);
    app.use(mongoErrorHandler);
    app.use(defaultErrorHandler);

    app.listen(PORT, () => {
      console.info(`Server starts at port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

start();
