const express = require('express')
const router = express.Router()
const { auth: ctrl } = require('../../controllers')
const { joiUserSchema, joiUserSchemaToUpdateSubscription } = require('../../models/user')
const { controllerWrapper, authenticate, validation } = require('../../middlewares')

router.patch('/', controllerWrapper(authenticate), validation(joiUserSchemaToUpdateSubscription), controllerWrapper(ctrl.updateSubscription))
router.post('/signup', validation(joiUserSchema), controllerWrapper(ctrl.signup))
router.post('/login', validation(joiUserSchema), controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

module.exports = router
