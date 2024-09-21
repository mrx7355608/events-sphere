const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");

const mongoAdapter = new MongooseAdapter({
    mongoUri: process.env.DATABASE_URL,
});

module.exports = mongoAdapter;
