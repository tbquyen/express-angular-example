/**
 * Required External Modules and Interfaces
 */
import log4js from "log4js";
import { Request, Response } from "express";
import { Category } from "../../models/category";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

export const getCategories = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] categories.getCategories`);
  const data = await Category.find().lean().exec().catch(next);
  res.send(data);
  log.debug(`[END] categories.getCategories`);
};

export const getCategory = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] categories.getCategory`);
  const category = await Category.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(category);
  log.debug(`[END] categories.getCategory`);
};

export const insert = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] categories.insert`);
  const category = new Category(req.body);
  const data = await category.save().catch(next);
  res.send(data);
  log.debug(`[END] categories.insert`);
};

export const update = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] categories.update`);
  const category = await Category.findOne({ _id: req.body.id })
    .exec()
    .catch(next);
  category.name = req.body.name;

  const data = await category.save().catch(next);
  res.send(data);
  log.debug(`[END] categories.update`);
};

export const remove = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] categories.delete`);
  const data = await Category.findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);
  res.send(data);
  log.debug(`[END] categories.delete`);
};
