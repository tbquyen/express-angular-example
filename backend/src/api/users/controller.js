const jwt = require("jsonwebtoken");
const Users = require("../../models").Users;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.getUsers = async (req, res, next) => {
  log.debug(`[START] users.getUsers`);
  const users = await Users.find().exec().catch(next);
  res.send(users);
  log.debug(`[END] users.getUsers`);
};

exports.getUser = async (req, res, next) => {
  log.debug(`[START] users.getUser`);
  const user = await Users.findOne({_id: req.params.id}).exec().catch(next);
  res.send(user);
  log.debug(`[END] users.getUser`);
};

exports.insert = async (req, res, next) => {
  log.debug(`[START] users.insert`);
  const user = new Users(req.body);
  const data = await user.save().catch(next);
  res.send(data);
  log.debug(`[END] users.insert`);
};

exports.update = async (req, res, next) => {
  log.debug(`[START] users.update`);
  const user = await Users.findOne({ _id: req.body.id })
    .exec()
    .catch(next);
  user.username = req.body.username;
  user.name = req.body.name;
  // user.password = req.body.password;
  user.role = req.body.role;
  const data = await user.save().catch(next);
  res.send(data);
  log.debug(`[END] users.update`);
};

exports.delete = async (req, res, next) => {
  log.debug(`[START] users.delete`);
  const data = await Users.findByIdAndRemove(req.params.id).exec().catch(next);
  res.send(data);
  log.debug(`[END] users.delete`);
};
