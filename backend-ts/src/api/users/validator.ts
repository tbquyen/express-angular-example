/**
 * Required External Modules and Interfaces
 */
import validator from "../../utils/validator.utils";
import { User } from "../../models/user";

/**
 * Validator Definition
 */
export const insert = validator({
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
      bail: true,
    },
    custom: {
      options: async (username) => {
        const user = await User.findOne({ username: username }).exec().catch();
        if (user) {
          return Promise.reject("Username already in use");
        }
      },
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
      bail: true,
    },
  },
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
      bail: true,
    },
  },
  role: {
    notEmpty: {
      errorMessage: "Role cannot be empty",
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
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
      bail: true,
    },
  },
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
      bail: true,
    },
  },
  role: {
    notEmpty: {
      errorMessage: "Role cannot be empty",
      bail: true,
    },
  },
});
