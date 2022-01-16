/**
 * Required External Modules and Interfaces
 */
import log4js from "log4js";
import { Request, Response } from "express";
import { Question } from "../../models/question";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

export const getQuestions = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] questions.getQuestions`);
  const questions = await Question.find({ categoryId: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(questions);
  log.debug(`[END] questions.getQuestions`);
};

export const getQuestion = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] questions.getQuestion`);
  const question = await Question.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(question);
  log.debug(`[END] questions.getQuestion`);
};

export const insert = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] questions.insert`);
  const question = new Question(req.body);
  const data = await question.save().catch(next);
  res.send(data);
  log.debug(`[END] questions.insert`);
};

export const update = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] questions.update`);
  const question = await Question.findOne({ _id: req.body.id })
    .exec()
    .catch(next);

  question.question = req.body.question;
  question.ans = req.body.ans;
  question.ans1 = req.body.ans1;
  question.ans2 = req.body.ans2;
  question.ans3 = req.body.ans3;
  question.ans4 = req.body.ans4;
  question.duration = req.body.duration;
  question.explanation = req.body.explanation;

  const data = await question.save().catch(next);
  res.send(data);
  log.debug(`[END] questions.update`);
};

export const remove = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] questions.delete`);
  const data = await Question.findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);
  res.send(data);
  log.debug(`[END] questions.delete`);
};
