const { loginSchema } = require("../utils/validation");

const loginValidation = (req, res, next) => {
  // Validate the request body using the Joi schema
  const { error } = loginSchema(req.body);

  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = loginValidation;
