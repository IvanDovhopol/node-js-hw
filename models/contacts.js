const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().min(7),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required('missing field favorite'),
});

const Contact = model('contact', contactsSchema);

module.exports = {
  Contact,
  joiSchema,
  joiFavoriteSchema,
};
