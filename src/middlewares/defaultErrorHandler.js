import InternalServerError from '../utils/errors/InternalServerError.js';

export default function defaultErrorHandler(error, reqг, res, next) {
  const { code, message, name } = new InternalServerError('Something went wrong');
  res.status(code).send({ message, name });
  next();
}
