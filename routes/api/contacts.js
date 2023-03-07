const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, joiFavoriteSchema } = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.fetchAll));
router.get('/:contactId', ctrlWrapper(ctrl.fetchById));
router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.update));
router.patch('/:contactId/favorite', validation(joiFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));
router.delete('/:contactId', ctrlWrapper(ctrl.remove));

module.exports = router;
