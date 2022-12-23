export default function defaultErrorHandler(error, reqг, res, next) {
  res.status(500).send({ message: 'Something went wrong', name: 'InternalServerError' });
  next();
}
