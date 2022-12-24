export default function errorLogger(error, request, response, next) {
  console.error(error);
  next(error);
}
