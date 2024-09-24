require("dotenv/config");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const keystone = require("./keystone");
const access = require("./utils/accessControl");
const acceptApplication = require("./mutations/acceptApplication");
const rejectApplication = require("./mutations/rejectApplication");
const registerForEvent = require("./mutations/registerForEvent");

const PROJECT_NAME = "Events Sphere";

// Setup keystone lists
keystone.createList("User", require("./lists/user"));
keystone.createList("Event", require("./lists/event"));
keystone.createList("Application", require("./lists/application"));
keystone.createList("Feedback", require("./lists/feedback"));

// Setup auth strategy
const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: "User",
    config: { protectIdentities: process.env.NODE_ENV === "production" },
});

// Add custom mutations
keystone.extendGraphQLSchema({
    mutations: [
        {
            schema: "acceptApplication(id: ID!): Application",
            resolver: acceptApplication,
        },
        {
            schema: "rejectApplication(id: ID!): Application",
            resolver: rejectApplication,
        },
        {
            schema: "registerForEvent(id: ID!): Event",
            resolver: registerForEvent,
        },
    ],
});

// Setup keystone app
module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({
            name: PROJECT_NAME,
            enableDefaultRoute: true,
            authStrategy,
            isAccessAllowed: access.userIsAdmin,
        }),
    ],
};
