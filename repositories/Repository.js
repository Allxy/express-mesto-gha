export default class Repository {
  #model;

  constructor(model) {
    this.#model = model;
  }

  create(data) {
    return this.#model.create(data);
  }

  getMany(filter = {}) {
    return this.#model.find(filter);
  }

  getOne(filter) {
    return this.#model.findById(filter);
  }

  deleteOne(filter) {
    return this.#model.findByIdAndDelete(filter);
  }

  updateOne(filter, data) {
    return this.#model.findByIdAndUpdate(filter, data, {
      new: true,
      runValidators: true,
    });
  }
}
