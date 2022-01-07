const log4js = require("log4js");
const mongoose = require("mongoose");
const log = log4js.getLogger("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("debug", (collectionName, method, query, options) => {
    log.debug(`${collectionName}.${method}`, JSON.stringify(query), options);
});

const db = {};
db.Logs = (data) => {
    log.debug(`result: ${JSON.stringify(data)}`);
};

db.mongoose = mongoose;
db.Users = require("./user.model")(mongoose);
db.Categories = require("./categories.model")(mongoose);
db.Questions = require("./question.model")(mongoose);
db.Quiz = require("./quiz.model")(mongoose);
db.QuizInfo = require("./quiz-info.model")(mongoose);

module.exports = db;