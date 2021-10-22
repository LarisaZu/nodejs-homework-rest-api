const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { addContactsValidation, patchContactsValidation } = require('../../validation/validation')

router.get('/', ctrl.listContacts)
router.get('/:contactId', ctrl.getContactById)
router.post('/', addContactsValidation, ctrl.addContact)
router.delete('/:contactId', ctrl.removeContact)
router.put('/:contactId', addContactsValidation, ctrl.updatePutContact)
router.patch('/:contactId', patchContactsValidation, ctrl.updatePatchContact)

module.exports = router
