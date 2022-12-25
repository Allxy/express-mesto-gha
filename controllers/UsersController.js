import UserRepository from '../repositories/UsersRepository.js';
import { CREATED_CODE, USER_NOT_FOUND } from '../utils/constants.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

async function createUser(request, response, next) {
  try {
    const user = await UserRepository.create(request.body);
    response.status(CREATED_CODE).send(user);
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
    const user = await UserRepository.getOne(request.params.id);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const user = await UserRepository.updateOne(request.user._id, request.body);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    next(error);
  }
}

function updateAvatar(request, response, next) {
  const { avatar } = request.body;
  request.body = { avatar };
  return updateUser(request, response, next);
}

function updateInfo(request, response, next) {
  const { name, about } = request.body;
  request.body = { name, about };
  return updateUser(request, response, next);
}

export default {
  createUser,
  getAllUsers,
  getUser,
  updateInfo,
  updateAvatar,
};
