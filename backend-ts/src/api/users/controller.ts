/**
 * Required External Modules and Interfaces
 */
import log4js from "log4js";
import { Request, Response } from "express";
import { User } from "../../models/user";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

export const getUsers = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] users.getUsers`);
  const users = await User.find().exec().catch(next);
  res.send(users);
  log.debug(`[END] users.getUsers`);
};

export const getUser = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] users.getUser`);
  const user = await User.findOne({ _id: req.params.id }).exec().catch(next);
  res.send(user);
  log.debug(`[END] users.getUser`);
};

export const insert = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] users.insert`);
  const user = new User(req.body);
  const data = await user.save().catch(next);
  res.send(data);
  log.debug(`[END] users.insert`);
};

export const update = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] users.update`);
  const user = await User.findOne({ _id: req.body.id }).exec().catch(next);
  user.username = req.body.username;
  user.name = req.body.name;
  // user.password = req.body.password;
  user.role = req.body.role;
  const data = await user.save().catch(next);
  res.send(data);
  log.debug(`[END] users.update`);
};

export const remove = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] users.delete`);
  const data = await User.findByIdAndRemove(req.params.id).exec().catch(next);
  res.send(data);
  log.debug(`[END] users.delete`);
};
