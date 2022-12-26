import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors as celebrateErrorHandler } from 'celebrate';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import {
  defaultErrorHandler, httpErrorHandler, authErrorHandler, mongoErrorHandler, errorLog,
} from './errors/index.js';
import router from './routes/index.js';
import requestLogger from './middlewares/reqlog.middleware.js';
import logger from './utils/logger.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/mestodb';
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'devjwtmesto';
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URL);
    logger.info('Success connection to database.');

    const app = express();
    app.use(limiter);
    app.use(helmet());
    app.use(json());
    app.use(cors());
    app.use(requestLogger);
    app.use('/', router);
    app.use(errorLog);
    app.use(celebrateErrorHandler());
    app.use(authErrorHandler);
    app.use(httpErrorHandler);
    app.use(mongoErrorHandler);
    app.use(defaultErrorHandler);

    app.listen(PORT, () => {
      logger.info(`Server starts at port ${PORT}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

start();
