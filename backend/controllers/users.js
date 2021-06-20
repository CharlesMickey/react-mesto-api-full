const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");
const Unauthorized = require("../errors/unauthorized");
const BadRequest = require("../errors/bad-request");
const Conflict = require("../errors/conflict");

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getInfoProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь с указанным _id не найден.");
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      }
      return next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError("Пользователь с указанным _id не найден.");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequest("Передан некорректный идентификатор пользователя.")
        );
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ name, about, avatar, email, _id: user._id }))
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(new Conflict("Используйте другой email"));
      } else if (err.name === "ValidationError") {
        next(
          new BadRequest(
            "Переданы некорректные данные при создании пользователя."
          )
        );
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new Unauthorized("Неправильные почта или пароль.");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Unauthorized("Неправильные почта или пароль.");
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        return res
          .cookie("jwt", token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send({ message: "Вы успешно авторизованны!" });
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь с указанным _id не найден.");
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь с указанным _id не найден.");
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      }
      return next(err);
    });
};
