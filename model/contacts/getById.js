const getById = async (contacts, id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const selectContact = await contacts.find(
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
