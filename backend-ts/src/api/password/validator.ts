/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";

/**
 * Validator Definition
 */
export const changepassword = validator({
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
