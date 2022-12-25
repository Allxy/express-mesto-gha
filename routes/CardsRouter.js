import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import CardsController from '../controllers/CardsController.js';

const router = Router();

router.get('', CardsController.getAllCards);

router.delete('/:id', celebrate({
  params: {
    id: Joi.string().uuid(),
  },
}), CardsController.deleteCard);

router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\//i),
  }),
}), CardsController.createCard);

router.put('/:id/likes', celebrate({
  params: {
    id: Joi.string().uuid(),
  },
}), CardsController.likeCard);

router.delete('/:id/likes', celebrate({
  params: {
    id: Joi.string().uuid(),
  },
}), CardsController.dislikeCard);

export default router;
