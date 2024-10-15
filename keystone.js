const { Keystone } = require("@keystonejs/keystone");
const mongoAdapter = require("./utils/db");

const keystone = new Keystone({
    adapter: mongoAdapter,
    cookieSecret: process.env.COOKIE_SECRET,
});

module.exports = keystone;
