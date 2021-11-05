const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOne({ _id: contactId, owner: req.user._id })
  if (!result) {
    throw new NotFound()
  }
  return res.status(200).json(result)
}

module.exports = getById
