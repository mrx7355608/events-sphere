const { Text, Password, Select, Relationship } = require("@keystonejs/fields");
const access = require("../utils/accessControl");
const checkAdminRoleOnSignup = require("../hooks/checkAdminRoleOnSignup");

const User = {
    fields: {
        name: { type: Text, isRequired: true },
        email: { type: Text, isRequired: true, isUnique: true },
        password: { type: Password, isRequired: true },
        profile_picture: {
            type: Text,
            defaultValue: process.env.DEFAULT_PROFILE_PICTURE,
        },
        role: {
            type: Select,
            options: "admin, exhibitor, attendee",
            defaultValue: "attendee",
            dataType: "string",
            isRequired: true,
            access: {
                update: access.userIsAdmin,
            },
            hooks: {
                validateInput: checkAdminRoleOnSignup,
            },
        },
    },

    adminConfig: {
        defaultColumns: "name, email, role",
        defaultSort: "name",
    },
    access: {
        read: access.userIsAdminOrOwner,
        update: access.userIsAdminOrOwner,
        // create: access.userIsAdmin,
        delete: access.userIsAdmin,
        auth: true,
    },
};

module.exports = User;
