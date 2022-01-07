const XLSX = require("xlsx");
const Questions = require("../../models").Questions;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.getQuestions = async (req, res, next) => {
  log.debug(`[START] questions.getQuestions`);
  const questions = await Questions.find({ categoryId: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(questions);
  log.debug(`[END] questions.getQuestions`);
};

exports.getQuestion = async (req, res, next) => {
  log.debug(`[START] questions.getQuestion`);
  const question = await Questions.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(question);
  log.debug(`[END] questions.getQuestion`);
};

exports.insert = async (req, res, next) => {
  log.debug(`[START] questions.insert`);
  const question = new Questions(req.body);
  const data = await question.save().catch(next);
  res.send(data);
  log.debug(`[END] questions.insert`);
};

// No	Categories	Question	Answer(A)	Answer(B)	Answer(C)	Answer(D)	Answer	Duration(seconds)	Explanation
exports.upload = async (req, res, next) => {
  log.debug(`[START] questions.upload`);
  const wb = XLSX.read(req.file.buffer);
  const ws = wb.Sheets[wb.SheetNames[0]];

  for (let iRow = 2; iRow < 1000; iRow++) {
    if (!ws["A" + iRow]?.v) break;
    const question = new Questions({
      categories: ws["B" + iRow]?.v,
      question: ws["C" + iRow]?.v,
      ans: ws["H" + iRow]?.v,
      ans1: ws["D" + iRow]?.v,
      ans2: ws["E" + iRow]?.v,
      ans3: ws["F" + iRow]?.v,
      ans4: ws["G" + iRow]?.v,
      explanation: ws["J" + iRow]?.v,
      duration: ws["I" + iRow]?.v,
    });

    await question.save().catch(next);
  }

  res.end();
  log.debug(`[END] questions.upload`);
};

exports.update = async (req, res, next) => {
  log.debug(`[START] questions.update`);
  const question = await Questions.findOne({ _id: req.body.id })
    .exec()
    .catch(next);
  Object.keys(req.body).map((key) => {
    question[key] = req.body[key];
  });

  const data = await question.save().catch(next);
  res.send(data);
  log.debug(`[END] questions.update`);
};

exports.delete = async (req, res, next) => {
  log.debug(`[START] questions.delete`);
  const data = await Questions.findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);
  res.send(data);
  log.debug(`[END] questions.delete`);
};
