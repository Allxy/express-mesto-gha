import HttpError from './HttpError.js';

export default class BadRequestError extends HttpError {
  constructor(message) {
    super(400, message);
  }
}
