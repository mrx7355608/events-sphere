const { Text, Password, Checkbox } = require("@keystonejs/fields");
const access = require("../utils/accessControl");

module.exports = {
    fields: {
        name: { type: Text },
        email: {
            type: Text,
            isUnique: true,
        },
        isAdmin: {
            type: Checkbox,
            access: {
                update: access.userIsAdmin,
            },
        },
        password: {
            type: Password,
        },
    },
    // List-level access controls
    access: {
        read: access.userIsAdminOrOwner,
        update: access.userIsAdminOrOwner,
        create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
    },
};
