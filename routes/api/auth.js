const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSubscriptionSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.patch('/:id', auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updSubscription));

module.exports = router;
