/**
 * Required External Modules and Interfaces
 */
import log4js from "log4js";
import moment from "moment";
import { Request, Response } from "express";
import { Quiz, QuizDocument } from "../../models/quiz";
import { Category } from "../../models/category";
import { QuizInfo } from "../../models/quiz-info";
import { Question } from "../../models/question";
import { PassportRequest } from "./../../config/styles.d";

/**
 * Controller Definition
 */
const log = log4js.getLogger();

const createQuizInfo = async (quiz: QuizDocument) => {
  const quizInfos = await QuizInfo.find({ quizId: quiz._id })
    .lean()
    .limit(1)
    .exec();
  if (quizInfos.length !== 0) return;

  let duration = 0;

  const qs = await Question.aggregate([
    { $sample: { size: 2 * quiz.numberQuestion } },
    { $match: { categoryId: quiz.categoryId } },
    { $limit: quiz.numberQuestion },
  ]);

  for (let i = 0; i < qs.length; i++) {
    const quizInfo = new QuizInfo({
      quizId: quiz._id,
      questionId: qs[i]._id,
      result: qs[i].ans,
    });

    duration += qs[i].duration;
    await quizInfo.save();
  }

  quiz.timeStart = new Date();
  quiz.timeEnd = moment(quiz.timeStart).add(duration, "seconds").toDate();
  await quiz.save();
};

export const getQuiz = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz-info.getQuiz`);
  let index = parseInt(req.params.index) - 1;
  const quizId = req.params.quizId;

  const quiz = await Quiz.findById(quizId).exec().catch(next);
  if (quiz.timeEnd && quiz.timeEnd <= new Date()) {
    res.end();
    return;
  }

  await createQuizInfo(quiz);

  if (index >= quiz.numberQuestion) {
    index = quiz.numberQuestion - 1;
  }

  const quizInfos = await QuizInfo.find({ quizId: quizId })
    .lean()
    .skip(index)
    .limit(1)
    .exec()
    .catch(next);
  const quizInfo = quizInfos[0];

  const question = await Question.findById(quizInfo.questionId)
    .lean()
    .exec()
    .catch(next);

  const category = await Category.findById(question.categoryId)
    .lean()
    .exec()
    .catch(next);

  quizInfo.quiz = quiz;
  quizInfo.category = category;
  quizInfo.question = question;

  res.send(quizInfo);
  log.debug(`[END] quiz-info.getQuiz`);
};

export const update = async (req: Request, res: Response, next: any) => {
  log.debug(`[START] quiz-info.update`);
  const id = req.body.id;
  const answer = req.body.answer;
  const isFinish = req.body.isFinish;

  const quizinfo = await QuizInfo.findById(id).exec();
  const quiz = await Quiz.findById(quizinfo.quizId).exec();

  if (quizinfo.answer === quizinfo.result) {
    quiz.passed--;
  }

  if (quizinfo.result === answer) {
    quiz.passed++;
  }

  quizinfo.answer = answer;
  await quizinfo.save().catch(next);

  if (isFinish) {
    quiz.timeEnd = new Date();
  }

  await quiz.save().catch(next);

  if (quiz.timeEnd <= new Date()) {
    res.send("0");
  } else {
    res.send("1");
  }
  log.debug(`[END] quiz-info.update`);
};
