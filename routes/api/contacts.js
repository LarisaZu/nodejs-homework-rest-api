const express = require('express')
const router = express.Router()
const { add, getAll, getById, updateById, deleteById, updateFavorite } = require('../../controllers/contacts')
const { joiContactSchema } = require('../../models/contact')
const { validation } = require('../../validation/validation')
// const {asyncWrapper} = require('../../helpers/')

router.get('/', getAll)
router.get('/:contactId', getById)
router.post('/', validation(joiContactSchema), add)
router.delete('/:contactId', deleteById)
router.put('/:contactId', validation(joiContactSchema), updateById)
router.patch('/:contactId/favorite', updateFavorite)

module.exports = router
