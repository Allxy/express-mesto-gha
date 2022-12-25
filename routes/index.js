import { Router } from 'express';
import { NOT_FOUND_ERR_CODE, PAGE_NOT_FOUND } from '../utils/constants.js';
import cardsRouter from './CardsRouter.js';
import userRouter from './UsersRouter.js';
import authRouter from './AuthRouter.js';
import auth from '../middlewares/AuthMiddleware.js';

const router = Router();

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (request, response) => {
  response.status(NOT_FOUND_ERR_CODE).send({ message: PAGE_NOT_FOUND });
});

export default router;
