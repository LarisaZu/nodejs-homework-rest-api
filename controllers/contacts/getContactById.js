const { getAll, getById } = require('../../model')

const getContactById = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { contactId } = req.params
    const contacts = await getAll()
    const contactById = await getById(contacts, contactId)
    if (!contactById) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(contactById)
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
