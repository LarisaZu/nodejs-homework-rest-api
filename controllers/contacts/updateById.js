const { Contact } = require('../../models/contact')

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
