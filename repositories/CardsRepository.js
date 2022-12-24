import CardModel from '../models/CardModel.js';
import Repository from './Repository.js';

class CardsRepository extends Repository {
  constructor() {
    super(CardModel);
  }
}
export default new CardsRepository();
