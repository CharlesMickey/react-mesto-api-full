const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/unauthorized");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized("Необходима авторизация.");
  }
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    throw new Unauthorized("Необходима авторизация.");
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
