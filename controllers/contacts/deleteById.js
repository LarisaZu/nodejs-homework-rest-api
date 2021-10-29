const { Contact } = require('../../models/contact')

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = deleteById
