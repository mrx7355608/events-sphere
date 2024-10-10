const { userValidator } = require("../validators");

module.exports = ({ originalInput, addFieldValidationError, context }) => {
    // Validate user fields
    userValidator(originalInput);

    const { authedItem: user } = context;
    if (originalInput.role.toLowerCase() === "admin") {
        if (user && user.role.toLowerCase() === "admin") {
            return true;
        }
        addFieldValidationError("You cannot assign the 'admin' role");
    }
};
