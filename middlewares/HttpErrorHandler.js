import HttpError from '../utils/errors/httpError.js';

export default function httpErrorHandler(error, request, response, next) {
  if (error instanceof HttpError) {
    const { code, name, message } = error;
    response.status(code).send({ name, message });
  } else {
    next(error);
  }
}
