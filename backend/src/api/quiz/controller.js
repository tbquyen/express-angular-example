// const XLSX = require("xlsx");
const Quiz = require("../../models").Quiz;
const Questions = require("../../models").Questions;
const QuizInfo = require("../../models").QuizInfo;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.getQuizs = async(req, res, next) => {
  log.debug(`[START] quiz.getquiz`);
  const data = await Quiz.find().lean().sort([
    ['_id', -1]
  ]).exec().catch(next);
  res.send(data);
  log.debug(`[END] quiz.getquiz`);
};

exports.getQuiz = async(req, res, next) => {
  log.debug(`[START] quiz.getCategory`);
  const quiz = await Quiz.findById(req.params.id)
    .lean()
    .exec()
    .catch(next);

  const quizInfos = await QuizInfo.find({ quizId: quiz._id })
    .lean()
    .exec()
    .catch(next);

  for (const quizInfo of quizInfos) {
    quizInfo.question = await Questions.findById(quizInfo.questionId)
      .lean()
      .exec()
      .catch(next);
  }

  quiz.quizInfo = quizInfos;
  res.send(quiz);
  log.debug(`[END] quiz.getCategory`);
};

exports.insert = async(req, res, next) => {
  log.debug(`[START] quiz.insert`);
  const model = new Quiz(req.body);
  model.userId = req.user._id;
  const data = await model.save().catch(next);
  res.send(data);
  log.debug(`[END] quiz.insert`);
};

exports.update = async(req, res, next) => {
  log.debug(`[START] quiz.update`);
  const model = await Quiz.findById(req.body.id).exec().catch(next);
  Object.keys(req.body).map((key) => {
    model[key] = req.body[key];
  });

  const data = await model.save().catch(next);
  res.send(data);
  log.debug(`[END] quiz.update`);
};

exports.delete = async(req, res, next) => {
  log.debug(`[START] quiz.delete`);
  const data = await Quiz.findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);

  await QuizInfo.deleteMany({ quizId: data._id });
  res.send(data);
  log.debug(`[END] quiz.delete`);
};