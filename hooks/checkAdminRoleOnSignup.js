const { userValidator } = require("../validators");

module.exports = ({ resolvedData, addFieldValidationError, context }) => {
    // Validate user fields
    userValidator(resolvedData);

    const { authedItem: user } = context;
    if (resolvedData.role.toLowerCase() === "admin") {
        if (user && user.role.toLowerCase() === "admin") {
            return true;
        }
        addFieldValidationError("You cannot assign the 'admin' role");
    }
};
