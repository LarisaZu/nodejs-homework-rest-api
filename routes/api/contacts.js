const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact } = require('../../model/index')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', removeContact)

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
