const getAll = require('./getAll')

const getById = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await getAll()
    // console.log('contacts', typeof contacts)
    const selectContact = contacts.find(
      contact => String(contact.id) === id,
    )
    if (!selectContact) {
      return null
    }
    return selectContact
  } catch (error) {
    throw (error)
  }
}

module.exports = getById
