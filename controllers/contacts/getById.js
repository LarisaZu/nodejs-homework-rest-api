const { Contact } = require('../../models/contact')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    console.log(contactId)
    const result = await Contact.findById(contactId)
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getById
