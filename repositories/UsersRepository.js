import UserModel from '../models/userModel.js';
import Repository from './repository.js';

class UserRepository extends Repository {
  constructor() {
    super(UserModel);
  }
}

export default new UserRepository();
