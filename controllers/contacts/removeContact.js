const { getById } = require('../../model/contacts')
const { getAll, updateContactsList } = require('../../model/contacts')

const removeContact = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contactId = req.params.contactId
    const contacts = await getAll()
    const contactById = await getById(contacts, contactId)

    if (!contactById) {
      return res.status(404).json({ message: 'Not found' })
    }

    const newListContacts = await contacts.filter(
      contact => String(contact.id) !== contactId
    )
    await updateContactsList(newListContacts)
    return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
