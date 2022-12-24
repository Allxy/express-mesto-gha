export default function errorLog(error, request, response, next) {
  console.error(error);
  next(error);
}
