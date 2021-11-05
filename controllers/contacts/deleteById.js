const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const deleteById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id }).populate('owner', '_id email')

  if (!result) {
    throw new NotFound()
  }
  return res.status(200).json(result)
}

module.exports = deleteById
