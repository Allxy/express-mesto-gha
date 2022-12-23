import express, { json } from 'express';
import mongoose from 'mongoose';
import defaultErrorHandler from './middlewares/defaultErrorHandler.js';
import httpErrorHandler from './middlewares/httpErrorHandler.js';
import mongoErorHandler from './middlewares/mongoErrorHandler.js';
import UsersRouter from './routes/UsersRouter.js';

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.info('Success connection to database.');

    const app = express();
    app.use(json());
    app.use('/users', UsersRouter);
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
