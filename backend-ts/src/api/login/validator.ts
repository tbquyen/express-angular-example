/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";

/**
 * Validator Definition
 */
export const login = validator({
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
