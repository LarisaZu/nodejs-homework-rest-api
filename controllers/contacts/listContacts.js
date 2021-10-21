const { getAll } = require('../../model')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getAll()
    return res.status(200).json(contacts)
  } catch (error) {
    // res.status(500).json({ message: error.message })
    next(error)
  }
}

module.exports = listContacts
