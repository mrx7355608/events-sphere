const { Text, Relationship } = require("@keystonejs/fields");
const {
    AuthedRelationship,
} = require("@keystonejs/fields-authed-relationship");
const accessControls = require("../utils/accessControl");

module.exports = {
    fields: {
        exhibitor: {
            type: AuthedRelationship,
            ref: "User",
            isRequired: true,
            many: false,
        },
        name: {
            type: Text,
            isRequired: true,
        },
        services: {
            type: Text,
            isRequired: true,
        },
        logo: {
            type: Text,
            isRequired: true,
        },
        event: {
            type: Relationship,
            ref: "Event",
            isRequired: true,
            many: false,
        },
        status: {
            type: Text,
            defaultValue: "pending",
            access: {
                update: accessControls.userIsAdmin,
            },
        },
    },

    access: {
        read: accessControls.userIsAdminOrOwner,
        update: accessControls.userIsAdminOrOwner,
        delete: accessControls.userIsAdminOrOwner,
    },

    hooks: {
        beforeChange: ({ context, addValidationError }) => {
            const { authedItem: user } = context;
            if (user) {
                const role = user.role.toLowerCase();
                if (role === "exhibitor" || role === "admin") {
                    return;
                }
                return addValidationError(
                    "Only exhibitors can send applications for events"
                );
            }

            addValidationError("You must signup to register an application");
        },
    },
};
