const validator = require("../../utils/validator.utils");

const insert = validator({
  categoryId: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
  numberQuestion: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
});

const update = validator({
  id: {
    notEmpty: {
      errorMessage: "Id cannot be empty",
      bail: true,
    },
  },
  categoryId: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
  numberQuestion: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
});

module.exports = { insert, update };
