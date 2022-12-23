import HttpError from './HttpError.js';

export default class InternalServerError extends HttpError {
  constructor(message) {
    super(500, message);
    this.name = 'InternalServerError';
  }
}
