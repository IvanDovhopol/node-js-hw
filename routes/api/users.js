const express = require('express');

const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { joiSchema, joiLoginSchema, emailSchema, joiSubscriptionSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));
router.patch('/:id/subscription', auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updSubscription));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', validation(emailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;
