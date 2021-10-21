const { getAll, updateContacts } = require('../../model')

const updatePutContact = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { name, email, phone } = req.body
    const { contactId } = req.params

    const contacts = await getAll()

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing fields' })
    }

    await contacts.forEach(contact => {
      if (String(contact.id) === contactId) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
    })

    await updateContacts(contacts)

    return res.status(200).json({ message: 'ok' })
  } catch (error) {
    next(error)
  }
}

module.exports = updatePutContact
