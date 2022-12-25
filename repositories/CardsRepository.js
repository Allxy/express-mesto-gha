import CardModel from '../models/CardModel.js';
import Repository from './Repository.js';

class CardsRepository extends Repository {
  constructor() {
    super(CardModel);
  }

  async create(data) {
    const card = await super.create(data);
    return card.populate('likes owner');
  }

  getMany(filter) {
    return super.getMany(filter).populate('likes owner');
  }

  getById(id) {
    return super.getById(id).populate('likes owner');
  }

  deleteById(id) {
    return super.deleteById(id).populate('likes owner');
  }

  updateById(id, data) {
    return super.updateById(id, data).populate('likes owner');
  }
}
export default new CardsRepository();
