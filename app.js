import express, { json } from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    console.info('Соединение с базой данных установленно');

    const app = express();
    app.use(json());

    app.listen(PORT, () => {
      console.info(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

start();
