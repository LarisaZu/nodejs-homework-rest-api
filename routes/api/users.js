const express = require('express')
const router = express.Router()
const { auth: ctrl } = require('../../controllers')
const { joiUserSchema, joiUserSchemaToUpdateSubscription } = require('../../models/user')
const { controllerWrapper, authenticate, validation, upload } = require('../../middlewares')

router.post('/signup', validation(joiUserSchema), controllerWrapper(ctrl.signup))
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))
router.post('/verify', controllerWrapper(ctrl.resending))
router.post('/login', validation(joiUserSchema), controllerWrapper(ctrl.login))
router.patch('/', controllerWrapper(authenticate), validation(joiUserSchemaToUpdateSubscription), controllerWrapper(ctrl.updateSubscription))
router.patch('/avatars', controllerWrapper(authenticate), upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

module.exports = router
