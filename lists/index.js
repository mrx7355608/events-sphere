const applicationSchema = require("./application");
const eventSchema = require("./event");
const userSchema = require("./user");
const feedbackSchema = require("./feedback");
const keystone = require("../keystone");

const applicationList = keystone.createList("Application", applicationSchema);
const eventList = keystone.createList("Event", eventSchema);
keystone.createList("User", userSchema);
keystone.createList("Feedback", feedbackSchema);

module.exports = { applicationList, eventList };
