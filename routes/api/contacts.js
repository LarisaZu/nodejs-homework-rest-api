const express = require('express')
const { contacts: ctrl } = require('../../controllers')
const { joiContactSchema } = require('../../models/contact')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')

const router = express.Router()

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))
router.get('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.getById))
router.post('/', controllerWrapper(authenticate), validation(joiContactSchema), controllerWrapper(ctrl.add))
router.delete('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.deleteById))
router.put('/:contactId', controllerWrapper(authenticate), validation(joiContactSchema), controllerWrapper(ctrl.updateById))
router.patch('/:contactId/favorite', controllerWrapper(authenticate), controllerWrapper(ctrl.updateFavorite))

module.exports = router
