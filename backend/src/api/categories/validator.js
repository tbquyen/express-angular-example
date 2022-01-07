const validator = require("../../utils/validator.utils");

const insert = validator({
  name: {
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
  name: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
});

module.exports = { insert, update };
