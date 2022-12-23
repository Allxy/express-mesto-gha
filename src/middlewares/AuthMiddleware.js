export default function authMiddleware(request, response, next) {
  request.user = {
    _id: '63a4efe910fccf33df41567b',
  };

  next();
}
