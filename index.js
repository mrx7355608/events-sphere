require("dotenv/config");
const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const initialiseData = require("./initial-data");
const mongoAdapter = require("./utils/db");
const access = require("./utils/accessControl");

const PROJECT_NAME = "Events Sphere";

const keystone = new Keystone({
    adapter: mongoAdapter,
    onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

keystone.createList("User", require("./lists/user"));
keystone.createList("Event", require("./lists/event"));
keystone.createList("Application", require("./lists/application"));

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: "User",
    config: { protectIdentities: process.env.NODE_ENV === "production" },
});

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
