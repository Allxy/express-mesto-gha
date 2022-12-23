import { Router } from 'express';
import CardsController from '../controllers/CardsController.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('', CardsController.getAllCards);
router.delete('/:id', CardsController.deleteCard);
router.post('', CardsController.createCard);
router.put('/:id/likes', CardsController.likeCard);
router.delete('/:id/likes', CardsController.dislikeCard);

export default router;
