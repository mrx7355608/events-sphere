const Joi = require("joi");

const schema = Joi.object({
    exhibitor: Joi.string().required().messages({
        "string.base": "Exhibitor must be a valid string.",
        "string.empty": "Exhibitor is required.",
        "any.required": "Exhibitor field is required.",
    }),

    name: Joi.string().required().messages({
        "string.base": "Name must be a valid string.",
        "string.empty": "Name is required.",
        "any.required": "Name field is required.",
    }),

    services: Joi.string().required().messages({
        "string.base": "Services must be a valid string.",
        "string.empty": "Services are required.",
        "any.required": "Services field is required.",
    }),

    logo: Joi.string().required().messages({
        "string.base": "Logo must be a valid string.",
        "string.empty": "Logo is required.",
        "any.required": "Logo field is required.",
    }),

    event: Joi.string().required().messages({
        "string.base": "Event must be a valid string.",
        "string.empty": "Event is required.",
        "any.required": "Event field is required.",
    }),

    status: Joi.string()
        .valid("approved", "rejected", "pending")
        .default("pending")
        .required()
        .messages({
            "string.base": "Status must be a valid string.",
            "any.only":
                "Status must be one of the following: approved, rejected, or pending.",
            "any.required": "Status field is required.",
        }),
});

module.exports = schema;
