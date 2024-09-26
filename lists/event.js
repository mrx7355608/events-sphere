const { Text, DateTime, Relationship } = require("@keystonejs/fields");
const accessControls = require("../utils/accessControl");

const Event = {
    fields: {
        title: { type: Text, isRequired: true },
        date: { type: DateTime, isRequired: true },
        location: { type: Text, isRequired: true },
        description: { type: Text, isRequired: true },
        theme: { type: Text, isRequired: true },
        exhibitors: {
            type: Relationship,
            many: true,
            ref: "User",
            defaultValue: [],
        },
        attendees: {
            type: Relationship,
            many: true,
            ref: "User",
            defaultValue: [],
        },
        feedbacks: {
            type: Relationship,
            many: true,
            ref: "Feedback.event",
            defaultValue: [],
        },
    },
    adminConfig: {
        defaultColumns: "location, theme, date",
        defaultSort: "date",
    },
    access: {
        read: accessControls.isSignedIn,
        create: accessControls.userIsAdmin,
        update: ({ authentication, originalInput }) => {
            const user = authentication.item;
            if (!user) {
                return false;
            }

            if (user.role === "admin") {
                return true;
            } else if (user.role === "attendee") {
                /*
                 * If an attendee is trying to update the event:
                 * 1st - Check if he is only modifying the "attendees" field
                 * 2nd - Check if he is not supplying the { disconnectAll: true } query
                 * If both conditions satisfy, let him update
                 */
                const updateKeys = Object.keys(originalInput);
                if (
                    updateKeys.includes("attendees") &&
                    !originalInput.attendees.disconnectAll
                ) {
                    return true;
                }

                return false;
            }

            return false;
        },
        delete: accessControls.userIsAdmin,
    },
    hooks: {},
    labelField: "title",
};

module.exports = Event;
