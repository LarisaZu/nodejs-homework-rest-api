const { Contact } = require('../../models/contact')

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  return res.status(201).json(result)
}

module.exports = add
