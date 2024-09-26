const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Name must be a valid string.",
        "string.empty": "Name is required.",
        "any.required": "Name field is mandatory.",
    }),

    email: Joi.string().email().required().messages({
        "string.base": "Email must be a valid string.",
        "string.email": "Email must be a valid email address.",
        "string.empty": "Email is required.",
        "any.required": "Email field is mandatory.",
    }),

    password: Joi.string().required().messages({
        "string.base": "Password must be a valid string.",
        "string.empty": "Password is required.",
        "any.required": "Password field is mandatory.",
    }),

    profile_picture: Joi.string()
        .optional()
        .default(process.env.DEFAULT_PROFILE_PICTURE)
        .messages({
            "string.base": "Profile picture must be a valid string.",
        }),

    role: Joi.string()
        .valid("exhibitor", "attendee")
        .default("attendee")
        .required()
        .messages({
            "string.base": "Role must be a valid string.",
            "any.only":
                "Role must be one of the following: exhibitor, or attendee.",
            "any.required": "Role field is mandatory.",
        }),
});

module.exports = userSchema;
