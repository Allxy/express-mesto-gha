import { Router } from 'express';
import { NOT_FOUND_ERR_CODE, PAGE_NOT_FOUND } from '../utils/constants.js';
import cardsRouter from './cards.router.js';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (request, response) => {
  response.status(NOT_FOUND_ERR_CODE).send({ message: PAGE_NOT_FOUND });
});

export default router;
