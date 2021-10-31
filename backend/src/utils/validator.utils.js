const log4js = require("log4js");
const log = log4js.getLogger();
const { validationResult } = require("express-validator");
const { checkSchema } = require("express-validator");

const validator = (schema) => {
  return async (req, res, next) => {
    const validations = checkSchema(schema);
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    // is valid
    if (errors.isEmpty()) {
      log.debug("validate: OK");
      return next();
    }

    // is invalid
    const result = {};
    errors.array().map((error) => {
      if (!result[error.param]) {
        result[error.param] = [];
      }

      result[error.param].push(error.msg);
    });

    log.debug(`validate: NG => ${JSON.stringify(result)}`);
    res.status(400).json(result);
  };
};

module.exports = validator;
