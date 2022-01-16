/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";

/**
 * Validator Definition
 */
export const insert = validator({
  name: {
    notEmpty: {
      errorMessage: "Categories cannot be empty",
      bail: true,
    },
  },
});

export const update = validator({
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
