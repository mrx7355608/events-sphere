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
            defaultValue: [],
            ref: "User",
        },
        attendees: {
            type: Relationship,
            many: true,
            defaultValue: [],
            ref: "User",
        },
    },
    adminConfig: {
        defaultColumns: "location, theme, date",
        defaultSort: "date",
    },
    access: {
        read: accessControls.isSignedIn,
        create: accessControls.userIsAdmin,
        update: accessControls.userIsAdmin,
        delete: accessControls.userIsAdmin,
    },
    labelField: "title",
};

module.exports = Event;
