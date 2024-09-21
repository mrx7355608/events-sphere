module.exports = async ({ resolvedData, addFieldValidationError, context }) => {
    const { authentication: { item: user } = {} } = context;

    if (
        resolvedData.role.toLowerCase() === "admin" &&
        (!user || user.role.toLowerCase() !== "admin")
    ) {
        addFieldValidationError("You cannot assign the 'admin' role");
    }
};
