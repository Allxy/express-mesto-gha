import express, { json } from 'express';
import mongoose from 'mongoose';
import defaultErrorHandler from './middlewares/DefaultErrorHandler.js';
import httpErrorHandler from './middlewares/HttpErrorHandler.js';
import mongoErorHandler from './middlewares/MongoErrorHandler.js';
import usersRouter from './routes/UsersRouter.js';
import cardsRouter from './routes/CardsRouter.js';

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.info('Success connection to database.');

    const app = express();
    app.use(json());
    app.use((req) => {
      req.user = {
        _id: '5d8b8592978f8bd833ca8133',
      };
    });
    app.use('/users', usersRouter);
    app.use('/cards', cardsRouter);
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
