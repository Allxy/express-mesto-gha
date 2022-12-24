import UserRepository from '../repositories/usersRepository.js';
import { CREATED_CODE, USER_NOT_FOUND } from '../utils/constants.js';
import NotFoundError from '../utils/errors/notFoundError.js';

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
  // Зачем тут проверять юзера, если это эндпоинт только для
  // авторизованного пользователя, он априори существует, иначе мы бы не залогинились
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
