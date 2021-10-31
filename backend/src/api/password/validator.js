const validator = require("../../utils/validator.utils");

const changepassword = validator({
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
  newPassword: {
    notEmpty: {
      errorMessage: "New Password cannot be empty",
      bail: true,
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: "Confirm Password cannot be empty",
      bail: true,
    },
    custom: {
      options: (value, { req }) => {
        return value === req.body.newPassword;
      },
      errorMessage: "Password and confirm password does not match",
      bail: true,
    },
  },
});

module.exports = { changepassword };
