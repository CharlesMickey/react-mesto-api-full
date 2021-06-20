const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getAllUsers,
  getInfoProfile,
  getUserId,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/me", getInfoProfile);
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({ userId: Joi.string().hex().length(24) }),
  }),
  getUserId
);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)/
      ),
    }),
  }),
  updateAvatar
);

module.exports = router;
