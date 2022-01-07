const moment = require("moment");
const Quiz = require("../../models").Quiz;
const Categories = require("../../models").Categories;
const Questions = require("../../models").Questions;
const QuizInfo = require("../../models").QuizInfo;
const log = require("log4js").getLogger();
require("dotenv").config();

const createQuizInfo = async(quiz) => {
  const quizInfos = await QuizInfo.find({ quizId: quiz._id })
    .lean()
    .limit(1)
    .exec();
  if (quizInfos.length !== 0) return;

  let duration = 0;

  const qs = await Questions.aggregate([
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

  quiz.timeStart = Date.now();
  quiz.timeEnd = moment(quiz.timeStart).add(duration, 'seconds');
  await quiz.save();
};

exports.getQuiz = async(req, res, next) => {
  log.debug(`[START] quiz-info.getQuiz`);
  let index = parseInt(req.params.index) - 1;
  const quizId = req.params.quizId;

  const quiz = await Quiz.findById(quizId).exec().catch(next);
  if (quiz.timeEnd && quiz.timeEnd <= Date.now()) {
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

  const question = await Questions.findById(quizInfo.questionId)
    .lean()
    .exec()
    .catch(next);

  const category = await Categories.findById(question.categoryId)
    .lean()
    .exec()
    .catch(next);

  quizInfo.quiz = quiz;
  quizInfo.category = category;
  quizInfo.question = question;

  res.send(quizInfo);
  log.debug(`[END] quiz-info.getQuiz`);
};

exports.update = async(req, res, next) => {
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
    quiz.timeEnd = Date.now();
  }

  await quiz.save().catch(next);

  if (quiz.timeEnd <= Date.now()) {
    res.send('0');
  } else {
    res.send('1');
  }
  log.debug(`[END] quiz-info.update`);
};