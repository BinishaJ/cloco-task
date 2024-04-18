const Joi = require("joi");

// Schema for registration
const registerSchema = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().max(255).messages({
      "any.empty": "First Name is required!",
      "any.required": "First Name is required!",
    }),
    last_name: Joi.string().required().max(255).messages({
      "any.empty": "Last Name is required!",
      "any.required": "Last Name is required!",
    }),
    email: Joi.string().email().required().max(255).messages({
      "string.email": "Enter a valid email!",
      "any.empty": "Email is required!",
      "any.required": "Email is required!",
    }),
    password: Joi.string().min(8).required().max(500).messages({
      "string.min": "Password must be at least 8 characters!",
      "any.empty": "Password is required!",
      "any.required": "Password is required!",
    }),
    phone: Joi.string().required().max(20).messages({
      "any.empty": "Phone is required!",
      "any.required": "Phone is required!",
    }),
    dob: Joi.date().iso().required().messages({
      "date.base": "Date of Birth must be a valid date!",
      "any.empty": "Date of Birth is required!",
      "any.required": "Date of Birth is required!",
    }),
    gender: Joi.string().valid("m", "f", "o").required().messages({
      "any.only": "Gender must be 'm', 'f', or 'o'!",
      "any.empty": "Gender is required!",
      "any.required": "Gender is required!",
    }),
    address: Joi.string().required().max(255).messages({
      "any.empty": "Address is required!",
      "any.required": "Address is required!",
    }),
  });
  return schema.validate(data);
};

// Schema for login
const loginSchema = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().max(255).messages({
      "string.email": "Enter a valid email!",
      "any.empty": "Email is required!",
      "any.required": "Email is required!",
    }),
    password: Joi.string().required().max(500).messages({
      "any.empty": "Password is required!",
      "any.required": "Password is required!",
    }),
  });
  return schema.validate(data);
};

module.exports = {
  registerSchema,
  loginSchema,
};
