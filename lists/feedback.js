const { Text, Relationship, Select } = require("@keystonejs/fields");
const accessControl = require("../utils/accessControl");

// Access control function for update and delete operations
const userIsAdminOrOwner = ({ existingItem, authentication }) => {
    const user = authentication.item;
    if (!user) {
        return false;
    }

    if (
        user.role === "admin" ||
        existingItem.user.toString() !== user.id.toString() // user owns this feedback
    ) {
        return true;
    }

    return false;
};

const Feedback = {
    fields: {
        feedback: {
            type: Text,
            isRequired: true,
        },
        overallExeperience: {
            type: Select,
            isRequired: true,
            options: "Very good, Good, Neutral, Bad, Very bad",
            dataType: "string",
            defaultValue: "Good",
        },
        user: {
            type: Relationship,
            isRequired: true,
            many: false,
            ref: "User",
        },
        event: {
            type: Relationship,
            isRequired: true,
            many: false,
            ref: "Event",
        },
    },

    access: {
        read: accessControl.isSignedIn,
        create: accessControl.isSignedIn,
        update: userIsAdminOrOwner,
        delete: userIsAdminOrOwner,
    },
};

module.exports = Feedback;
