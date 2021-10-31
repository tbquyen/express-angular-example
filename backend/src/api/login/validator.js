const validator = require("../../utils/validator.utils");

const login = validator({
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
      bail: true,
    },
  },
});

module.exports = { login };
