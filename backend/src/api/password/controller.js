const jwt = require("jsonwebtoken");
const Users = require("../../models").Users;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.changepassword = async (req, res, next) => {
  log.debug(`[START] login.changepassword`);
  const user = await Users.findOne({ username: req.body.username })
    .exec()
    .catch();
  // skip Bcrypt
  if (user && user.password === req.body.password) {
    // skip Bcrypt
    user.password = req.body.newPassword;
    user.expired = false;
    const data = user.save().catch(next);
    console.log(data);

    var payload = { username: user.username };
    var token = jwt.sign(payload, process.env.JWT_SECRET);
    // production: secure: true
    res.cookie(process.env.JWT_COOKIE, token, { httpOnly: true, secure: false, signed: true, maxAge: 3600000 });
    res.json({ username: user.username });
  } else {
    res.status(400).json({ username: "Username or password is incorrect" });
  }
  log.debug(`[END] login.changepassword`);
};
