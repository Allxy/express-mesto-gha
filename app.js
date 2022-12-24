import express, { json } from 'express';
import mongoose from 'mongoose';
import defaultErrorHandler from './middlewares/DefaultErrorHandler.js';
import errorLogger from './middlewares/ErrorLogger.js';
import httpErrorHandler from './middlewares/HttpErrorHandler.js';
import mongoErorHandler from './middlewares/MongoErrorHandler.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.info('Success connection to database.');

    const app = express();
    app.use(json());
    app.use((req, res, next) => {
      req.user = {
        _id: '63a4efe910fccf33df41567b',
      };
      next();
    });
    app.use('/', router);
    app.use(errorLogger);
    app.use(httpErrorHandler);
    app.use(mongoErorHandler);
    app.use(defaultErrorHandler);

    app.listen(PORT, () => {
      console.info(`Server starts at port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

start();
