import CastError from 'mongoose/lib/error/cast.js';
import MongooseError from 'mongoose/lib/error/mongooseError.js';
import ValidationError from 'mongoose/lib/error/validation.js';

export default function mongoErorHandler(error, request, response, next) {
  if (error instanceof MongooseError) {
    if (error instanceof ValidationError) {
      const { name, message } = error;
      response.status(400).send({ name, message });
    } else if (error instanceof CastError) {
      const { name, value, kind } = error;
      response.status(400).send({ name, message: `Value '${value}' is not valid ${kind}` });
    } else {
      next(error);
    }
  } else {
    next(error);
  }
}
