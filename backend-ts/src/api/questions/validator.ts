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
  question: {
    notEmpty: {
      errorMessage: "question cannot be empty",
      bail: true,
    },
  },
  ans1: {
    notEmpty: {
      errorMessage: "ans1 cannot be empty",
      bail: true,
    },
  },
  ans2: {
    notEmpty: {
      errorMessage: "ans2 cannot be empty",
      bail: true,
    },
  },
  ans3: {
    notEmpty: {
      errorMessage: "ans3 cannot be empty",
      bail: true,
    },
  },
  ans4: {
    notEmpty: {
      errorMessage: "ans4 cannot be empty",
      bail: true,
    },
  },
  duration: {
    notEmpty: {
      errorMessage: "duration cannot be empty",
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
  question: {
    notEmpty: {
      errorMessage: "question cannot be empty",
      bail: true,
    },
  },
  ans1: {
    notEmpty: {
      errorMessage: "ans1 cannot be empty",
      bail: true,
    },
  },
  ans2: {
    notEmpty: {
      errorMessage: "ans2 cannot be empty",
      bail: true,
    },
  },
  ans3: {
    notEmpty: {
      errorMessage: "ans3 cannot be empty",
      bail: true,
    },
  },
  ans4: {
    notEmpty: {
      errorMessage: "ans4 cannot be empty",
      bail: true,
    },
  },
  duration: {
    notEmpty: {
      errorMessage: "duration cannot be empty",
      bail: true,
    },
  },
});
