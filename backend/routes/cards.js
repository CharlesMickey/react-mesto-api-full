const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getAllCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(
          /^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)/
        ),
    }),
  }),
  createCard
);
router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
  }),
  deleteCard
);
router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
  }),
  likeCard
);
router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().hex().length(24) }),
  }),
  dislikeCard
);

module.exports = router;
