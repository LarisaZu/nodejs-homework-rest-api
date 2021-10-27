const { getAll, getById, updateContactsList } = require('../../model/contacts')

const updatePatchContact = async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { name, email, phone } = req.body
    const { contactId } = req.params
    const contacts = await getAll()
    const updateContact = await getById(contacts, contactId)

    if (!updateContact) {
      return res.status(404).json({ message: 'Not found' })
    }

    if (updateContact) {
      if (name) {
        updateContact.name = name
      }
      if (email) {
        updateContact.email = email
      }
      if (phone) {
        updateContact.phone = phone
      }
    }

    await updateContactsList(contacts)

    return res.status(200).json({ updateContact, message: 'ok' })
  } catch (error) {
    next(error)
  }
}

module.exports = updatePatchContact
