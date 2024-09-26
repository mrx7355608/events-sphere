const { Text, Select, Relationship } = require("@keystonejs/fields");
const {
    AuthedRelationship,
} = require("@keystonejs/fields-authed-relationship");
const accessControls = require("../utils/accessControl");
const { applicationValidator } = require("../validators");

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
            type: Select,
            options: "approved, rejected, pending",
            defaultValue: "pending",
            dataType: "string",
            isRequired: true,
            access: {
                update: accessControls.userIsAdmin,
            },
        },
    },

    access: {
        read: ({ authentication: { item: user } }) => {
            if (!user) return false;
            if (user.role === "attendee") return false;
            if (user.role === "admin") return true;
            return { exhibitor: { id: user.id } };
        },
        update: ({ authentication: { item: user } }) => {
            if (!user) return false;
            if (user.role === "attendee") return false;
            if (user.role === "admin") return true;
            return { exhibitor: { id: user.id } };
        },
        delete: ({ authentication: { item: user } }) => {
            if (!user) return false;
            if (user.role === "attendee") return false;
            if (user.role === "admin") return true;
            return { exhibitor: { id: user.id } };
        },
    },

    hooks: {
        validateInput: ({ resolvedData }) => {
            applicationValidator(resolvedData);
        },
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
