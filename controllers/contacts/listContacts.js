const { getAll } = require('../../model/contacts')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getAll()
    return res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
