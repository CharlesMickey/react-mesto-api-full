const router = require("express").Router();
const NotFoundError = require("../errors/not-found-err");

router.get("*", () => {
  throw new NotFoundError("Вы пытаетесь перейти по несуществующему пути.");
});

module.exports = router;
