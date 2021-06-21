const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequest = require("../errors/bad-request");
const Forbidden = require("../errors/forbidden");

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .sort({ date: 1 })
    .exec()
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при создании карточки.")
        );
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка с указанным _id не найдена.");
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden("Можно удалять только свои карточки.");
      } else {
        Card.findByIdAndRemove(req.params.cardId).then(() => res.send(card));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Передан некорректный идентификатор карточки."));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          "Переданы некорректные данные для постановки лайка."
        );
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Передан некорректный идентификатор карточки."));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          "Переданы некорректные данные для снятия лайка."
        );
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Передан некорректный идентификатор карточки."));
      }
      return next(err);
    });
};
