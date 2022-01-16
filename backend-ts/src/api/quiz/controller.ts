/**
 * Required External Modules and Interfaces
 */
import log4js from "log4js";
import { Request, Response } from "express";
import { Quiz } from "../../models/quiz";
import { Category } from "../../models/category";
import { QuizInfo } from "../../models/quiz-info";
import { Question } from "../../models/question";
import { PassportRequest } from "./../../config/styles.d";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

export const getQuizs = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz.getquiz`);
  const data = await Quiz.find()
    .lean()
    .sort([["_id", -1]])
    .exec()
    .catch(next);
  res.send(data);
  log.debug(`[END] quiz.getquiz`);
};

export const getQuiz = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz.getCategory`);
  const quiz = await Quiz.findById(req.params.id).lean().exec().catch(next);

  const quizInfos = await QuizInfo.find({ quizId: quiz._id })
    .lean()
    .exec()
    .catch(next);

  for (const quizInfo of quizInfos) {
    quizInfo.question = await Question.findById(quizInfo.questionId)
      .lean()
      .exec()
      .catch(next);
  }

  quiz.quizInfo = quizInfos;
  res.send(quiz);
  log.debug(`[END] quiz.getCategory`);
};

export const insert = async (
  req: PassportRequest,
  res: Response,
  next: any
) => {
  log.debug(`[START] quiz.insert`);
  const model = new Quiz(req.body);
  model.userid = req.user._id;
  const data = await model.save().catch(next);
  res.send(data);
  log.debug(`[END] quiz.insert`);
};

export const update = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz.update`);
  const model = await Quiz.findById(req.body.id).exec().catch(next);
  model.categoryId = req.body.categoryId;
  model.numberQuestion = req.body.numberQuestion;

  const data = await model.save().catch(next);
  res.send(data);
  log.debug(`[END] quiz.update`);
};

export const remove = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz.delete`);
  const data = await Quiz.findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);

  await QuizInfo.deleteMany({ quizId: data._id });
  res.send(data);
  log.debug(`[END] quiz.delete`);
};
