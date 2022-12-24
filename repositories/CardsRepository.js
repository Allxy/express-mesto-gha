import CardModel from '../models/cardModel.js';
import Repository from './repository.js';

class CardsRepository extends Repository {
  constructor() {
    super(CardModel);
  }
}
export default new CardsRepository();
