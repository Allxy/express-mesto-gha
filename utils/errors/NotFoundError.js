import { NOT_FOUND_ERR_CODE } from '../constants.js';
import HttpError from './httpError.js';

export default class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND_ERR_CODE, message);
    this.name = 'NotFoundError';
  }
}
