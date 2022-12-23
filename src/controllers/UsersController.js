import UserRepository from '../repositories/UsersRepository.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

async function createUser(request, response, next) {
  try {
    const user = await UserRepository.createUser(request.body);
    response.send(user);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(request, response, next) {
  try {
    const users = await UserRepository.getUsers();
    response.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(request, response, next) {
  try {
    const user = await UserRepository.getUserById(request.params.id);
    if (user === null) {
      throw new NotFoundError('User not found');
    } else {
      response.send(user);
    }
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getAllUsers,
  getUserById,
};
