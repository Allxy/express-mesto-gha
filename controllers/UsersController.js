import { isValidObjectId } from 'mongoose';
import UserRepository from '../repositories/UsersRepository.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

async function createUser(request, response, next) {
  try {
    const user = await UserRepository.create(request.body);
    response.status(201).send(user);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(request, response, next) {
  try {
    const users = await UserRepository.getMany();
    response.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(request, response, next) {
  try {
    const userId = request.params.id;
    if (!isValidObjectId(userId)) {
      throw new BadRequestError('User id is not valid');
    }
    const user = await UserRepository.getOne(userId);
    if (user === null) {
      throw new NotFoundError('User not found');
    } else {
      response.send(user);
    }
  } catch (error) {
    next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const { name, about } = request.body;
    const user = await UserRepository.updateOne(request.user._id, { name, about });
    response.send(user);
  } catch (error) {
    next(error);
  }
}

async function updateAvatar(request, response, next) {
  try {
    const { avatar } = request.body;
    const user = await UserRepository.updateOne(request.user._id, { avatar });
    response.send(user);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
};
