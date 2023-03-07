const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, joiSubscriptionSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/:id', auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updSubscription));

module.exports = router;
