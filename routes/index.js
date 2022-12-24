import { Router } from 'express';
import cardsRouter from './CardsRouter.js';
import userRouter from './UsersRouter.js';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (request, response) => {
  response.status(404).send({ message: "Endpoint doesn't exist" });
});

export default router;
