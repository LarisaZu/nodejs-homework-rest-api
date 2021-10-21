const { v4: uuidv4 } = require('uuid')
const { getAll, updateContacts } = require('../../model')

const addContact = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { name, email, phone } = req.body
    const contacts = await getAll()

    const newUser = {
      id: uuidv4(),
      name,
      email,
      phone,
    }

    await contacts.push(newUser)
    await updateContacts(contacts)
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
