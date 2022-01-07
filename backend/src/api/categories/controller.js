const XLSX = require("xlsx");
const categories = require("../../models").Categories;
const log = require("log4js").getLogger();
require("dotenv").config();

exports.getCategories = async (req, res, next) => {
  log.debug(`[START] categories.getCategories`);
  const data = await categories.find().lean().exec().catch(next);
  res.send(data);
  log.debug(`[END] categories.getCategories`);
};

exports.getCategory = async (req, res, next) => {
  log.debug(`[START] categories.getCategory`);
  const category = await categories
    .findOne({ _id: req.params.id })
    .lean()
    .exec()
    .catch(next);
  res.send(category);
  log.debug(`[END] categories.getCategory`);
};

exports.insert = async (req, res, next) => {
  log.debug(`[START] categories.insert`);
  const category = new categories(req.body);
  const data = await category.save().catch(next);
  res.send(data);
  log.debug(`[END] categories.insert`);
};

// No	Categories
exports.upload = async (req, res, next) => {
  log.debug(`[START] categories.upload`);
  const wb = XLSX.read(req.file.buffer);
  const ws = wb.Sheets[wb.SheetNames[0]];

  for (let iRow = 2; iRow < 1000; iRow++) {
    if (!ws["A" + iRow]?.v) break;
    const category = new categories({
      name: ws["B" + iRow]?.v,
    });

    await category.save().catch(next);
  }

  res.end();
  log.debug(`[END] categories.upload`);
};

exports.update = async (req, res, next) => {
  log.debug(`[START] categories.update`);
  const category = await categories
    .findOne({ _id: req.body.id })
    .exec()
    .catch(next);
  Object.keys(req.body).map((key) => {
    category[key] = req.body[key];
  });

  const data = await category.save().catch(next);
  res.send(data);
  log.debug(`[END] categories.update`);
};

exports.delete = async (req, res, next) => {
  log.debug(`[START] categories.delete`);
  const data = await categories
    .findByIdAndRemove(req.params.id)
    .lean()
    .exec()
    .catch(next);
  res.send(data);
  log.debug(`[END] categories.delete`);
};
