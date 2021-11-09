const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    { new: true },
  ).populate('owner', '_id email')
  if (!result) {
    throw new NotFound()
  }
  return res.status(200).json(result)
}

module.exports = updateById
