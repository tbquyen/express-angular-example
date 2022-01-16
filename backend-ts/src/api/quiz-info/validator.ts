/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";

/**
 * Validator Definition
 */
export const update = validator({
  answer: {
    notEmpty: {
      errorMessage: "Answer cannot be empty",
      bail: true,
    },
  },
});