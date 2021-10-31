const validator = require("../../utils/validator.utils");
const Users = require("../../models").Users;

const insert = validator({
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
      bail: true,
    },
    custom: {
      options: async (username) => {
        const user = await Users.findOne({ username: username }).exec().catch();
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

const update = validator({
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

module.exports = { insert, update };
