const { Contact } = require('../../models/contact')
const { BadRequest, NotFound } = require('http-errors')

const updateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  if (favorite === undefined) {
    throw new BadRequest('Missing field favorite')
  }

  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: req.user._id,
    },
    { favorite },
    { new: true },
  ).populate('owner', '_id email')
  if (!result) {
    throw new NotFound()
  }
  return res.status(200).json(result)
}

module.exports = updateFavorite
