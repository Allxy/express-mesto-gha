export default class Repository {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async create(data) {
    const item = new this.#model(data);
    await item.save();
    return item;
  }

  getOne(filter = {}) {
    return this.#model.findOne(filter);
  }

  getMany(filter = {}) {
    return this.#model.find(filter);
  }

  getById(id) {
    return this.#model.findById(id);
  }

  deleteById(id) {
    return this.#model.findByIdAndDelete(id);
  }

  updateById(id, data) {
    return this.#model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
