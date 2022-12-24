import { Router } from 'express';
import CardsController from '../controllers/cardsController.js';

const router = Router();

router.get('', CardsController.getAllCards);
router.delete('/:id', CardsController.deleteCard);
router.post('', CardsController.createCard);
router.put('/:id/likes', CardsController.likeCard);
router.delete('/:id/likes', CardsController.dislikeCard);

export default router;
