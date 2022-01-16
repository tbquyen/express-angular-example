/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";

/**
 * Validator Definition
 */
export const insert = validator({
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

export const update = validator({
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