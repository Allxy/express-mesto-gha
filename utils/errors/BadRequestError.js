import { BAD_REQUEST_ERR_CODE } from '../constants.js';
import HttpError from './httpError.js';

export default class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST_ERR_CODE, message);
    this.name = 'BadRequestError';
  }
}
