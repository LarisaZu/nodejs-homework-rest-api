const { Schema, model } = require('mongoose')
const Joi = require('joi')

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/

const contactSchema = Schema({
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: phoneRegExp
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false,
  timestamps: true,
},
)

const joiContactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string(),
  // eslint-disable-next-line prefer-regex-literals
  phone: Joi.string().pattern(phoneRegExp),
  favorite: Joi.boolean().default(false)
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema }
