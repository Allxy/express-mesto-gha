import UserModel from '../models/UserModel.js';

function createUser(data) {
  return UserModel.create(data);
}

function getUsers(query = {}) {
  return UserModel.find(query, {}).exec();
}

function getUserOne(query) {
  return UserModel.findOne(query).exec();
}

function getUserById(id) {
  return UserModel.findById(id).exec();
}

export default {
  createUser,
  getUsers,
  getUserOne,
  getUserById,
};
