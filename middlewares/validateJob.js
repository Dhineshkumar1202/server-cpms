const Joi = require("joi");

const jobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  subject: Joi.string().required(),
  requirements: Joi.string().optional(),
  location: Joi.string().required(),
  applicationDeadline: Joi.date().required(),
  postedBy: Joi.string().required(),
});

const validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateJob;
