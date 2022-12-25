import CardsRepository from '../repositories/CardsRepository.js';
import { CARD_NOT_FOUND, CREATED_CODE, NO_RIGHTS } from '../utils/constants.js';
import ForbiddenError from '../utils/errors/ForbiddenError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

async function createCard(request, response, next) {
  try {
    const card = await CardsRepository.create({ ...request.body, owner: request.user._id });
    response.status(CREATED_CODE).send(card);
  } catch (error) {
    next(error);
  }
}

async function getAllCards(request, response, next) {
  try {
    const cards = await CardsRepository.getMany();
    response.send(cards);
  } catch (error) {
    next(error);
  }
}

async function deleteCard(request, response, next) {
  try {
    const card = await CardsRepository.getById(request.params.id);
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    if (card.owner.id !== request.user._id) {
      throw new ForbiddenError(NO_RIGHTS);
    }
    await CardsRepository.deleteById(request.params.id);
    response.send(card);
  } catch (error) {
    next(error);
  }
}

async function toggleLike(action, request, response, next) {
  try {
    const card = await CardsRepository.updateById(request.params.id, {
      [action]: { likes: request.user._id },
    });
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

function likeCard(request, response, next) {
  return toggleLike('$addToSet', request, response, next);
}

function dislikeCard(request, response, next) {
  return toggleLike('$pull', request, response, next);
}

export default {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
