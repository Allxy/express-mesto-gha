import { isValidObjectId } from 'mongoose';

export default class Repository {
  #model;

  constructor(model) {
    this.#model = model;
  }

  create(data) {
    return this.#model.create(data);
  }

  getMany(filter = {}) {
    return this.#model.find(filter).exec();
  }

  getOne(filter) {
    if (isValidObjectId(filter)) {
      return this.#model.findById(filter).exec();
    }
    if (typeof filter === 'object') {
      return this.#model.findOne(filter).exec();
    }
    return null;
  }

  deleteOne(filter) {
    if (isValidObjectId(filter)) {
      return this.#model.findByIdAndDelete(filter).exec();
    }
    if (typeof filter === 'object') {
      return this.#model.deleteOne(filter).exec();
    }
    return null;
  }

  updateOne(filter, data) {
    if (isValidObjectId(filter)) {
      return this.#model.findByIdAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      }).exec();
    }
    if (typeof filter === 'object') {
      return this.#model.updateOne(filter, data, {
        new: true,
        runValidators: true,
      }).exec();
    }
    return null;
  }
}
