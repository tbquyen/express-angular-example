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

export const login = async (req: Request, res: Response): Promise<void> => {
  log.debug(`[START] login.login`);
  const data = await User.findOne({ username: req.body.username })
    .lean()
    .exec()
    .catch();

  // skip Bcrypt
  if (data && data.password === req.body.password) {
    if (data.expired) {
      res.status(401).json({ password: "Change or reset your password" });
      return;
    }

    const payload = { id: data._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // production: secure: true
    res.cookie(process.env.JWT_COOKIE, token, {
      httpOnly: true,
      secure: false,
      signed: true,
      maxAge: 3600000,
    });
    data.password = "";

    res.send(data);
  } else {
    res.status(400).json({ password: "Password is incorrect" });
  }
  log.debug(`[END] login.login`);
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  log.debug(`[START] login.logout`);
  res.clearCookie(process.env.JWT_COOKIE, {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: 3600000,
  });
  res.status(200).send(req.user);
  log.debug(`[END] login.logout`);
};

export const authorization = async (
  req: Request,
  res: Response
): Promise<void> => {
  log.debug(`[START] login.authorization`);
  res.status(200).send(req.user);
  log.debug(`[END] login.authorization`);
};
