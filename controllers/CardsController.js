import CardsRepository from '../repositories/CardsRepository.js';
import { CARD_NOT_FOUND, CREATED_CODE } from '../utils/constants.js';
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
    const cards = await CardsRepository.getMany().populate('likes');
    response.send(cards);
  } catch (error) {
    next(error);
  }
}

async function deleteCard(request, response, next) {
  try {
    const card = await CardsRepository.deleteOne(request.params.id);
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

async function toggleLike(action, request, response, next) {
  try {
    const card = await CardsRepository.updateOne(request.params.id, {
      [action]: { likes: request.user._id },
    }).populate('likes');
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

const likeCard = toggleLike.bind(null, '$addToSet');
const dislikeCard = toggleLike.bind(null, '$pull');

export default {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
