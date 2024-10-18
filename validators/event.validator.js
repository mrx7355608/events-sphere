const Joi = require("joi");

const eventSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a valid string.",
        "string.empty": "Title is required.",
        "any.required": "Title field is mandatory.",
    }),

    date: Joi.date().required().messages({
        "date.base": "Date must be a valid date.",
        "any.required": "Date field is mandatory.",
    }),

    location: Joi.string().required().messages({
        "string.base": "Location must be a valid string.",
        "string.empty": "Location is required.",
        "any.required": "Location field is mandatory.",
    }),

    description: Joi.string().required().messages({
        "string.base": "Description must be a valid string.",
        "string.empty": "Description is required.",
        "any.required": "Description field is mandatory.",
    }),

    theme: Joi.string().required().messages({
        "string.base": "Theme must be a valid string.",
        "string.empty": "Theme is required.",
        "any.required": "Theme field is mandatory.",
    }),
}).options({ allowUnknown: true });

module.exports = eventSchema;
