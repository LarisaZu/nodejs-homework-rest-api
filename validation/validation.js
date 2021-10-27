const Joi = require('joi')

const addContactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    // eslint-disable-next-line prefer-regex-literals
    phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$')).required()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }

  next()
}

const patchContactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().optional(),
    // eslint-disable-next-line prefer-regex-literals
    phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$')).optional(),
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }

  next()
}

module.exports = {
  addContactsValidation,
  patchContactsValidation
}
