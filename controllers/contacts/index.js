const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updatePutContact = require('./updatePutContact')
const updatePatchContact = require('./updatePatchContact')

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updatePutContact,
  updatePatchContact
}
