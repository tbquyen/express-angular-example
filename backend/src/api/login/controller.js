const jwt = require("jsonwebtoken");
const db = require("../../models");
const Users = db.Users;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.login = async (req, res, next) => {
  log.debug(`[START] login.authenticate`);
  const data = await Users.findOne({ username: req.body.username })
    .exec()
    .catch();
  db.Logs(data);

  // skip Bcrypt
  if (data && data.password === req.body.password) {
    if (data.expired) {
      res.status(401).json({ password: "Change or reset your password" });
      return;
    }

    var payload = { username: data.username };
    var token = jwt.sign(payload, process.env.JWT_SECRET);
    // production: secure: true
    res.cookie(process.env.JWT_COOKIE, token, {
      httpOnly: true,
      secure: false,
      signed: true,
      maxAge: 3600000,
    });
    res.json({ username: data.username });
  } else {
    res.status(400).json({ password: "Password is incorrect" });
  }
  log.debug(`[END] login.authenticate`);
};

exports.authorization = async (req, res, next) => {
  log.debug(`[START] login.authorization`);
  res.status(200).json("success");
  log.debug(`[END] login.authorization`);
};
