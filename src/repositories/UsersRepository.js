import UserModel from '../models/UserModel.js';
import Repository from './Repository.js';

class UserRepository extends Repository {
  constructor() {
    super(UserModel);
  }
}

export default new UserRepository();
