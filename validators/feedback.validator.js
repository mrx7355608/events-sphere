const Joi = require("joi");

const feedbackSchema = Joi.object({
    feedback: Joi.string().required().messages({
        "string.base": "Feedback must be a valid string.",
        "string.empty": "Feedback is required.",
        "any.required": "Feedback field is mandatory.",
    }),

    overallExperience: Joi.string()
        .valid("Very good", "Good", "Neutral", "Bad", "Very bad")
        .default("Good")
        .required()
        .messages({
            "string.base": "Overall experience must be a valid string.",
            "any.only":
                "Overall experience must be one of the following: Very good, Good, Neutral, Bad, Very bad.",
            "any.required": "Overall experience field is mandatory.",
        }),

    user: Joi.string().required().messages({
        "string.base": "User must be a valid string.",
        "string.empty": "User is required.",
        "any.required": "User field is mandatory.",
    }),

    event: Joi.string().required().messages({
        "string.base": "Event must be a valid string.",
        "string.empty": "Event is required.",
        "any.required": "Event field is mandatory.",
    }),
});

module.exports = feedbackSchema;
