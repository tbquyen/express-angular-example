/**
 * Required External Modules and Interfaces
 */
import jwt from "jsonwebtoken";
import log4js from "log4js";
import { Request, Response } from "express";
import { User } from "../../models/user";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

export const changepassword = async (
  req: Request,
  res: Response,
  next: any
) => {
  log.debug(`[START] login.changepassword`);
  const user = await User.findOne({ username: req.body.username })
    .exec()
    .catch();
  // skip Bcrypt
  if (user && user.password === req.body.password) {
    // skip Bcrypt
    user.password = req.body.newPassword;
    user.expired = false;
    const data = user.save().catch(next);
    res.json({ username: user.username });
  } else {
    res.status(400).json({ username: "Username or password is incorrect" });
  }
  log.debug(`[END] login.changepassword`);
};
