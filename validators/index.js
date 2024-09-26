const userSchema = require("./user.validator");
const eventSchema = require("./event.validator");
const feedbackSchema = require("./feedback.validator");
const applicationSchema = require("./application.validator");

export function userValidator(data) {
    const { error } = userSchema.validate(data);
    if (error) {
        throw new Error(error.message);
    }
}

export function eventValidator(data) {
    const { error } = eventSchema.validate(data);
    if (error) {
        throw new Error(error.message);
    }
}

export function feedbackValidator(data) {
    const { error } = feedbackSchema.validate(data);
    if (error) {
        throw new Error(error.message);
    }
}

export function applicationValidator(data) {
    const { error } = applicationSchema.validate(data);
    if (error) {
        throw new Error(error.message);
    }
}
