const validator = require("../../utils/validator.utils");

const update = validator({
    answer: {
        notEmpty: {
            errorMessage: "Answer cannot be empty",
            bail: true,
        },
    },
});

module.exports = { update };