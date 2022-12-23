import CardsRepository from '../repositories/CardsRepository.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

async function createCard(request, response, next) {
  try {
    const card = await CardsRepository.create({ ...request.body, owner: request.user._id });
    response.send(card);
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
    const card = await CardsRepository.deleteOne(request.params.id);
    if (card === null) {
      throw new NotFoundError('Card not found');
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

async function likeCard(request, response, next) {
  try {
    const card = await CardsRepository.updateOne(request.params.id, {
      $addToSet: { likes: request.user._id },
    });
    if (card === null) {
      throw new NotFoundError('Card not found');
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

async function dislikeCard(request, response, next) {
  try {
    const card = await CardsRepository.updateOne(request.params.id, {
      $pull: { likes: request.user._id },
    });
    if (card === null) {
      throw new NotFoundError('Card not found');
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

export default {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
