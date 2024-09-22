const { Keystone } = require("@keystonejs/keystone");
const initialiseData = require("./initial-data");
const mongoAdapter = require("./utils/db");

const keystone = new Keystone({
    adapter: mongoAdapter,
    onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

module.exports = keystone;
