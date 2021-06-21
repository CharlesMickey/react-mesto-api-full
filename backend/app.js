require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { celebrate, Joi, errors } = require("celebrate");
const routesUsers = require("./routes/users");
const routesCards = require("./routes/cards");
const nonExistentRoute = require("./routes/nonExistentRoute");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const handleErrors = require("./errors/handleErrors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const corsWhiteList = [
  "https://charlesmickey.nomoredomains.monster",
  "http://charlesmickey.nomoredomains.monster",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  credentials: true,
};

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(cors(corsOptions));
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^((http|https):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)/
      ),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);

app.use(auth);

app.use(routesCards);
app.use(routesUsers);
app.use(nonExistentRoute);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors);

app.listen(PORT);
